import VisionCamera
import UIKit
import CoreML
import CoreVideo
import CoreImage
import Accelerate

@available(iOS 15.0, *)
typealias BrixModel = brixcolorv4_yv10m;
@available(iOS 15.0, *)
typealias BrixModelOuput = brixcolorv4_yv10mOutput;

@available(iOS 16.0, *)
@objc(LegoDetectorFrameProcessorPlugin)
public class LegoDetectorFrameProcessorPlugin: FrameProcessorPlugin {
  var brixModel: BrixModel?

  public override init(proxy: VisionCameraProxyHolder, options: [AnyHashable: Any]! = [:]) {
    // Tell Core ML to use the Neural Engine if available.
    let config = MLModelConfiguration()
    config.computeUnits = .all
    self.brixModel = try? BrixModel(configuration: config)

    super.init(proxy: proxy, options: options)
  }

  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable: Any]?) -> Any? {
    guard let brixModel = self.brixModel else {
      return ["error": "Model could not be initialized"]
    }

    // CMSampleBuffer -> CVPixelBuffer and UIImage
    guard let pixelBuffer = CMSampleBufferGetImageBuffer(frame.buffer), let uiImage = UIImage(pixelBuffer: pixelBuffer) else {
      return ["error": "Invalid frame"]
    }

//    guard let grayUIImage = convertToGrayscale(image: uiImage),
    guard let scaledUIImage = scaleFit(image: uiImage) else {
      return ["error": "Could not scale UIImage"]
    }

    guard let resizedBuffer = scaledUIImage.pixelBuffer(width: 640, height: 640) else {
      return ["error": "Could not resize pixel buffer"]
    }

    guard let threshold = (arguments?["threshold"] ?? 0.5) as? NSNumber else {
      return ["Could not interpret threshold argument"]
    }

    guard let result = try? brixModel.prediction(image: resizedBuffer) else {
      return ["error": "Could not predict"]
    }

    // No NMS
    let preds =  noNmsExtract(result: result.var_1589, threshold: threshold.doubleValue)
    let output = preds.map{ [$0.0, $0.1, [$0.2.minX, $0.2.minY, $0.2.width, $0.2.height, ]] }

    // Clean
    CVPixelBufferGetBaseAddress(resizedBuffer)?.deallocate()

    return output
  }
}
