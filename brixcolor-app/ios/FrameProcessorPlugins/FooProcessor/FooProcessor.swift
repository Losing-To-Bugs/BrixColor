import VisionCamera
import UIKit
import CoreML
import CoreVideo
import CoreImage


@available(iOS 15.0, *)
@objc(FooProcessorPlugin)
public class FooProcessorPlugin: FrameProcessorPlugin {
  
  public override init(proxy: VisionCameraProxyHolder, options: [AnyHashable: Any]! = [:]) {
    super.init(proxy: proxy, options: options)
  }

  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable: Any]?) -> Any? {
    
    return ["conf": 0.01]
  }
}
