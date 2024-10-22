import { VisionCameraProxy, Frame } from 'react-native-vision-camera'

const plugin = VisionCameraProxy.initFrameProcessorPlugin('detectBrick', {})

export function detectBrick(frame: Frame): [number, number, number[]][] | {error: string} {
    'worklet'
    if (plugin == null) {
        throw new Error("Failed to load Frame Processor Plugin!")
    }
    const result = plugin.call(frame, {threshold: 0.55});

    return result as [number, number, number[]][] | {error: string}
}
