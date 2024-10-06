import { VisionCameraProxy, Frame } from 'react-native-vision-camera'

const plugin = VisionCameraProxy.initFrameProcessorPlugin('detectFaces', {})

export function scanFaces(frame: Frame) {
    'worklet'
    if (plugin == null) {
        throw new Error("Failed to load Frame Processor Plugin!")
    }
    const result = plugin.call(frame, {a: 1});
    console.log(plugin, result)

    return result
}
