import VisionCamera

@objc(FaceDetectorFrameProcessorPlugin)
public class FaceDetectorFrameProcessorPlugin: FrameProcessorPlugin {
  public override init(proxy: VisionCameraProxyHolder, options: [AnyHashable : Any]! = [:]) {
    super.init(proxy: proxy, options: options)

        print("FaceDetectorFrameProcessorPlugin initialized with options: \(String(describing: options))")
  }

  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable : Any]?) -> Any? {
    let buffer = frame.buffer
    let orientation = frame.orientation
    // code goes here

    let imageBuffer = CMSampleBufferGetImageBuffer(frame.buffer)

    if let arguments, let imageBuffer {
      let width = CVPixelBufferGetWidth(imageBuffer)
      let height = CVPixelBufferGetHeight(imageBuffer)
      let count = arguments.count

      print(
        "ExampleSwiftPlugin: \(width) x \(height) Image. Logging \(count) parameters:"
      )

      for key in arguments.keys {
        let value = arguments[key]
        let valueString = String(describing: value)
        let valueClassString = String(describing: value.self)
        print("ExampleSwiftPlugin:   -> \(valueString) (\(valueClassString))")
      }

//      let saveResult = saveImageFromBuffer(imageBuffer, to: FileManager.default.temporaryDirectory.appendingPathComponent("output_image.png"), as: "png")
//      print(saveResult ? "Image saved successfully in \(FileManager.default.temporaryDirectory.path)" : "Failed to save the image")

      return [
        "tmp": FileManager.default.temporaryDirectory.path,
        "width": width,
        "height": height
      ]
    }

    return [
      "width": nil,
      "height": nil
    ]
  }
}


// Function to save the image from the buffer
func saveImageFromBuffer(_ imageBuffer: CVPixelBuffer, to url: URL, as format: String = "png") -> Bool {
    // 1. Convert CVPixelBuffer to CIImage
    let ciImage = CIImage(cvPixelBuffer: imageBuffer)

    // 2. Convert CIImage to CGImage using CIContext
    let context = CIContext()
    guard let cgImage = context.createCGImage(ciImage, from: ciImage.extent) else {
        print("Error: Could not create CGImage")
        return false
    }

    // 3. Convert CGImage to UIImage
    let uiImage = UIImage(cgImage: cgImage)

    // 4. Convert UIImage to Data (PNG or JPG)
    var imageData: Data?

    if format.lowercased() == "jpg" || format.lowercased() == "jpeg" {
        imageData = uiImage.jpegData(compressionQuality: 1.0) // Adjust compression quality if needed
    } else if format.lowercased() == "png" {
        imageData = uiImage.pngData()
    } else {
        print("Error: Unsupported image format. Use 'png' or 'jpg'.")
        return false
    }

    // 5. Write the data to a file
    do {
        try imageData?.write(to: url)
        print("Image saved to \(url)")
        return true
    } catch {
        print("Error saving image: \(error)")
        return false
    }
}
