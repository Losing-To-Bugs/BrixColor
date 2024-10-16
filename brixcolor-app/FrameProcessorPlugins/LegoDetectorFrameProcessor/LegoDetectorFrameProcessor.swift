import VisionCamera
import UIKit
import CoreML
import CoreVideo
import CoreImage
import Accelerate

@available(iOS 15.0, *)
typealias BrixModel = brixblenderv2_t1;
@available(iOS 15.0, *)
typealias BrixModelOuput = brixblenderv2_t1Output;

@available(iOS 16.0, *)
@objc(LegoDetectorFrameProcessorPlugin)
public class LegoDetectorFrameProcessorPlugin: FrameProcessorPlugin {
  var brixModel: BrixModel?

  public override init(proxy: VisionCameraProxyHolder, options: [AnyHashable: Any]! = [:]) {
    // Tell Core ML to use the Neural Engine if available.
    self.brixModel = try? BrixModel(configuration: .init())

    super.init(proxy: proxy, options: options)
  }

  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable: Any]?) -> Any? {
    guard let brixModel = self.brixModel else {
      return ["error": "Model could not be initialized"]
    }

    // CMSampleBuffer -> CVPixelBuffer and UIImage
    guard let pixelBuffer = CMSampleBufferGetImageBuffer(frame.buffer) else {
      return ["error": "Invalid frame"]
    }
    
    guard let resizedBuffer = resizePixelBuffer(pixelBuffer, width: 640, height: 640) else {
      return ["error": "Could not resize pixel buffer"]
    }

    guard let result = try? brixModel.prediction(image: resizedBuffer) else {
      return ["error": "Could not predict"]
    }

    let nmsPreds = multiArrayToNMSPredictions(result: result.var_2268)
    let output = nmsPreds.map{ [$0.0, $0.1, [$0.2.minX, $0.2.minY, $0.2.width, $0.2.height, ]] }
    
    // Clean
    CVPixelBufferGetBaseAddress(resizedBuffer)?.deallocate()
    
    return output
  }
}
