import { VisionCameraProxy, Frame } from 'react-native-vision-camera'

const plugin = VisionCameraProxy.initFrameProcessorPlugin('detectBrick', {})

export function detectBrick(frame: Frame) {
    'worklet'
    if (plugin == null) {
        throw new Error("Failed to load Frame Processor Plugin!")
    }
    const result = plugin.call(frame);

    return result
}
