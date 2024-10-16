import VisionCamera
import UIKit
import CoreML
import CoreVideo
import CoreImage

@available(iOS 15.0, *)
typealias BrixModel = brixblenderv2_t;
@available(iOS 15.0, *)
typealias BrixModelOuput = brixblenderv2_tOutput;

extension CGImagePropertyOrientation {
    init(_ uiOrientation: UIImage.Orientation) {
        switch uiOrientation {
            case .up: self = .up
            case .upMirrored: self = .upMirrored
            case .down: self = .down
            case .downMirrored: self = .downMirrored
            case .left: self = .left
            case .leftMirrored: self = .leftMirrored
            case .right: self = .right
            case .rightMirrored: self = .rightMirrored
        }
    }
}

func imageFromBuffer(_ pixelBuffer: CVPixelBuffer) -> UIImage? {
    // Create a CIImage from the pixel buffer
    let ciImage = CIImage(cvPixelBuffer: pixelBuffer)

    // Create a CIContext to render the CIImage
    let context = CIContext()

    // Get the width and height of the pixel buffer
    let width = CVPixelBufferGetWidth(pixelBuffer)
    let height = CVPixelBufferGetHeight(pixelBuffer)

    // Create a CGImage from the CIImage
    if let cgImage = context.createCGImage(ciImage, from: CGRect(x: 0, y: 0, width: 640, height: 640)) {
        // Convert the CGImage to UIImage
        return UIImage(cgImage: cgImage)
    }

    return nil
}

func resizeCIImage(image: CIImage, targetSize: CGSize) -> CIImage? {
    // Calculate the scaling factors for width and height
    let scaleX = targetSize.width / image.extent.width
    let scaleY = targetSize.height / image.extent.height

    // Apply the scaling transformation to resize the image
    let scaleTransform = CGAffineTransform(scaleX: scaleX, y: scaleY)
    let scaledImage = image.transformed(by: scaleTransform)

    return scaledImage
}

func resizeAndPad(image: CIImage, targetSize: CGSize = CGSize(width: 640, height: 640)) -> UIImage? {
    // Create a CIContext
    let context = CIContext(options: nil)

    // Get the current image size
    let imageRect = image.extent

    // Calculate the scale factor to fit the image within the target size
    let widthScale = targetSize.width / imageRect.width
    let heightScale = targetSize.height / imageRect.height
    let scaleFactor = min(widthScale, heightScale)

    // Calculate the new size with aspect ratio maintained
    let scaledWidth = imageRect.width * scaleFactor
    let scaledHeight = imageRect.height * scaleFactor

    // Create a new rect centered within the target size
    let xOffset = (targetSize.width - scaledWidth) / 2
    let yOffset = (targetSize.height - scaledHeight) / 2
    let drawRect = CGRect(x: xOffset, y: yOffset, width: scaledWidth, height: scaledHeight)

    // Create a white background image
    UIGraphicsBeginImageContextWithOptions(targetSize, true, 0)
    UIColor.white.setFill()
    UIRectFill(CGRect(origin: .zero, size: targetSize))

    // Render the CIImage into the context
    if let cgImage = context.createCGImage(image, from: image.extent) {
        UIImage(cgImage: cgImage).draw(in: drawRect)
    }

    // Capture the result
    let paddedImage = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()

    return paddedImage
}

@available(iOS 15.0, *)
func extractOutput(output: BrixModelOuput) -> Any? {
    var maxConf = 0.0
    var maxConfCol = 0


    for col in 0...output.confidence.count-1 {
        let conf = output.confidence[col]
        if conf.doubleValue > maxConf {
            maxConf = conf.doubleValue
            maxConfCol = col
        }
    }


    return [
        "cls": maxConfCol,
        "conf": maxConf,
        "w":output.coordinates[2],
        "h":output.coordinates[3],
        "x":output.coordinates[0],
        "y":output.coordinates[1],
    ]
}

func bufferFromImage(from image: UIImage) -> CVPixelBuffer? {
  let attrs = [kCVPixelBufferCGImageCompatibilityKey: kCFBooleanTrue, kCVPixelBufferCGBitmapContextCompatibilityKey: kCFBooleanTrue] as CFDictionary
  var pixelBuffer : CVPixelBuffer?
  let status = CVPixelBufferCreate(kCFAllocatorDefault, Int(image.size.width), Int(image.size.height), kCVPixelFormatType_32ARGB, attrs, &pixelBuffer)
  guard (status == kCVReturnSuccess) else {
    return nil
  }

  CVPixelBufferLockBaseAddress(pixelBuffer!, CVPixelBufferLockFlags(rawValue: 0))
  let pixelData = CVPixelBufferGetBaseAddress(pixelBuffer!)

  let rgbColorSpace = CGColorSpaceCreateDeviceRGB()
  let context = CGContext(data: pixelData, width: Int(image.size.width), height: Int(image.size.height), bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(pixelBuffer!), space: rgbColorSpace, bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue)

  context?.translateBy(x: 0, y: image.size.height)
  context?.scaleBy(x: 1.0, y: -1.0)

  UIGraphicsPushContext(context!)
  image.draw(in: CGRect(x: 0, y: 0, width: image.size.width, height: image.size.height))
  UIGraphicsPopContext()
  CVPixelBufferUnlockBaseAddress(pixelBuffer!, CVPixelBufferLockFlags(rawValue: 0))

  return pixelBuffer
}

func saveImageToDocumentsDirectory(image: UIImage, fileName: String) -> URL? {
    // Convert the image to PNG or JPEG data
  guard let data = image.jpegData(compressionQuality: 1.0 ) else { return nil }

    // Get the document directory path
    let documentsDirectory = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!

    // Create the file URL
    let fileURL = documentsDirectory.appendingPathComponent(fileName)

    do {
        // Write the data to the file
        try data.write(to: fileURL)
        print("Image saved to: \(fileURL)")
        return fileURL
    } catch {
        print("Error saving image to file: \(error.localizedDescription)")
        return nil
    }
}



@available(iOS 15.0, *)
@objc(LegoDetectorFrameProcessorPlugin)
public class LegoDetectorFrameProcessorPlugin: FrameProcessorPlugin {
  var brixModel: BrixModel?

  public override init(proxy: VisionCameraProxyHolder, options: [AnyHashable: Any]! = [:]) {
    // Tell Core ML to use the Neural Engine if available.
//    let config = MLModelConfiguration()
//    config.computeUnits = .all
//    self.brixModel = try? BrixModel(configuration: config)
    self.brixModel = try? BrixModel(configuration: .init())

    super.init(proxy: proxy, options: options)
  }

  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable: Any]?) -> Any? {
    guard let brixModel = self.brixModel else {
      return ["error": "Model could not be initialized"]
    }

    // CMSampleBuffer -> CVPixelBuffer and UIImage
    guard let imgBuffer = CMSampleBufferGetImageBuffer(frame.buffer),
          let img = imageFromBuffer(imgBuffer) else {
      return ["error": "Invalid frame"]
    }

    // CVPixelBuffer -> CIImage (maintain orientation)
    let ciimg = CIImage(cvPixelBuffer: imgBuffer
                        ,
                        options: [.applyOrientationProperty: true,
                                  .properties: [
                                    kCGImagePropertyOrientation: CGImagePropertyOrientation(frame.orientation).rawValue
                                  ]]
    )



    // Rescale CIImage and convert to UIImage
    guard let resizedUIImage = resizeAndPad(image: ciimg) else {
      return ["error": "Could not resize image"]
    }

    // UIImage -> CVPixelBuffer
    guard let resizedPixelBuffer = bufferFromImage(from: resizedUIImage) else {
      return ["error": "Could not convert CIImage to CVPixelBuffer"]
    }

//    // Predict
//    guard let result = try? brixModel.prediction(image: resizedPixelBuffer, iouThreshold: 0.1, confidenceThreshold: 0.1) else {
//      return ["error": "Could not predict"]
//    }
//
//    // Check if there is a score
//    guard result.confidence.count > 0 else {
//      return ["error": "No score"]
//    }
//
//    guard result.coordinates.count > 0 else {
//      return ["error": "No coords"]
//    }

//    guard let output = extractOutput(output: result) else {
//      return ["error": "No output"]
//    }

    do {
      let url = try saveImageToDocumentsDirectory(image: resizedUIImage, fileName: "foo.jpg")
      return ["url": url?.absoluteString]
    } catch {
      print(error)
      return ["error", "Save image failed"]
    }

//    return output


  }
}
