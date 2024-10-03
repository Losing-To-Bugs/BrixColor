#import <VisionCamera/FrameProcessorPlugin.h>
#import <VisionCamera/FrameProcessorPluginRegistry.h>

#if __has_include("BrixColor/BrixColor-Swift.h")
#import "BrixColor/BrixColor-Swift.h"
#else
#import "BrixColor-Swift.h"
#endif

VISION_EXPORT_SWIFT_FRAME_PROCESSOR(LegoDetectorFrameProcessorPlugin, detectBrick)