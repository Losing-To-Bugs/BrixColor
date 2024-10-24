import { VisionCameraProxy, Frame } from 'react-native-vision-camera'

const plugin = VisionCameraProxy.initFrameProcessorPlugin('detectColor', {})

export function detectColor(frame: Frame /*, options: {}*/): {red: number, green: number, blue: number, alpha: number} | {error: string} {
    'worklet'
    if (plugin == null) {
        throw new Error("Failed to load Frame Processor Plugin!")
    }


    const result = plugin.call(frame /*, options*/);

    return result as {red: number, green: number, blue: number, alpha: number} | {error: string}
}
