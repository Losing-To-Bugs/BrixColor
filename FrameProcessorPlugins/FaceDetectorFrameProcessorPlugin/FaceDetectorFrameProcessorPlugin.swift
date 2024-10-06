import VisionCamera
import UIKit
import CoreML
import CoreVideo
import CoreImage

// Function to convert UIImage to CVPixelBuffer
func imageToPixelBuffer(image: UIImage) -> CVPixelBuffer? {
    // Convert UIImage to CGImage
    guard let cgImage = image.cgImage else { return nil }

    // Define pixel buffer attributes
    let options: [CFString: Any] = [
        kCVPixelBufferCGImageCompatibilityKey: kCFBooleanTrue,
        kCVPixelBufferCGBitmapContextCompatibilityKey: kCFBooleanTrue
    ]

    // Create CVPixelBuffer
    var pixelBuffer: CVPixelBuffer?
    let width = cgImage.width
    let height = cgImage.height
    let status = CVPixelBufferCreate(
        kCFAllocatorDefault,
        width,
        height,
        kCVPixelFormatType_32ARGB, // Change this depending on your format
        options as CFDictionary,
        &pixelBuffer
    )

    guard status == kCVReturnSuccess, let buffer = pixelBuffer else {
        return nil
    }

    // Lock the pixel buffer base address
    CVPixelBufferLockBaseAddress(buffer, .readOnly)

    // Create a CGContext and draw the image into it
    let colorSpace = CGColorSpaceCreateDeviceRGB()
    guard let context = CGContext(
        data: CVPixelBufferGetBaseAddress(buffer),
        width: width,
        height: height,
        bitsPerComponent: 8,
        bytesPerRow: CVPixelBufferGetBytesPerRow(buffer),
        space: colorSpace,
        bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue
    ) else {
        CVPixelBufferUnlockBaseAddress(buffer, .readOnly)
        return nil
    }

    context.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))

    // Unlock the pixel buffer base address
    CVPixelBufferUnlockBaseAddress(buffer, .readOnly)

    return buffer
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
    if let cgImage = context.createCGImage(ciImage, from: CGRect(x: 0, y: 0, width: width, height: height)) {
        // Convert the CGImage to UIImage
        return UIImage(cgImage: cgImage)
    }

    return nil
}



func rescale(image: UIImage, targetSize: CGSize) -> UIImage? {
    // Rescale the image
    UIGraphicsBeginImageContextWithOptions(targetSize, false, 0.0)
    image.draw(in: CGRect(origin: .zero, size: targetSize))
    let resizedImage = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()

    return resizedImage
}

func convertToGrayScale(image: UIImage) -> UIImage {
    let context = CIContext(options: nil)
    let currentFilter = CIFilter(name: "CIPhotoEffectMono")

    // Convert UIImage to CIImage
    let beginImage = CIImage(image: image)
    currentFilter?.setValue(beginImage, forKey: kCIInputImageKey)

    // Get the filtered image
    let outputImage = currentFilter?.outputImage

    // Convert output CIImage back to UIImage
    let cgImage = context.createCGImage(outputImage!, from: outputImage!.extent)

    return UIImage(cgImage: cgImage!)
}

@available(iOS 15.0, *)
func extractOutput(output: FooModelOutput) -> Any? {
    let result = output.var_2268

    var maxConf = 0.0
    var maxConfCol = 0
    var maxConfRow = 0

    for col in 0...result.shape[2].intValue-1 {

        for row in 4...result.shape[1].intValue-1 {
            let conf = result[[0, row as NSNumber, col as NSNumber]]

            if conf.doubleValue > maxConf {
                maxConf = conf.doubleValue
                maxConfCol = col
                maxConfRow = row
            }

        }
    }

    return [
        "cls": maxConfRow - 4,
        "conf": maxConf,
        "w":result[[0, 2, maxConfCol as NSNumber]],
        "h":result[[0, 3, maxConfCol as NSNumber]],
        "x":result[[0, 0, maxConfCol as NSNumber]],
        "y":result[[0, 1, maxConfCol as NSNumber]],
    ]
}



@available(iOS 15.0, *)
typealias FooModel = sept30_brixcolor_blender_grayscale_100epoch_nano_m_16;

@available(iOS 15.0, *)
typealias FooModelOutput = sept30_brixcolor_blender_grayscale_100epoch_nano_m_16Output

@available(iOS 15.0, *)
@objc(FooProcessorPlugin)
public class FooProcessorPlugin: FrameProcessorPlugin {
  var fooModel: FooModel?

  public override init(proxy: VisionCameraProxyHolder, options: [AnyHashable: Any]! = [:]) {
    self.fooModel = try? FooModel(configuration: .init())

    super.init(proxy: proxy, options: options)
  }

  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable: Any]?) -> Any? {
    let buffer = frame.buffer
    let orientation = frame.orientation

    if let fooModel = self.fooModel,
       let imgBuffer = CMSampleBufferGetImageBuffer(frame.buffer),
       let img = imageFromBuffer(imgBuffer) {

      let gimage = convertToGrayScale(image: img)
      let rgimage = rescale(image: gimage, targetSize: CGSize(width: 320, height: 320))

      // Back to buffer
      if let rgimage,
         let imageBuffer = imageToPixelBuffer(image: rgimage) {

        let result = try? fooModel.prediction(image: imageBuffer)

        if let result {
            let scores = extractOutput(output: result)
            return scores
        }
      }
    }

    return [321]
  }
}
