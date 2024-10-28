import { VisionCameraProxy, Frame } from 'react-native-vision-camera'

const plugin = VisionCameraProxy.initFrameProcessorPlugin('detectColor', {})

export function detectColor(frame: Frame  /*, options: {x: number, y: number, width: number, height: number}*/): {red: number, green: number, blue: number, alpha: number} | {error: string} {
    'worklet'
    if (plugin == null) {
        throw new Error("Failed to load Frame Processor Plugin!")
    }

    // console.log(newOptions);
    const result = plugin.call(frame /*, newOptions*/);

    return result as {red: number, green: number, blue: number, alpha: number} | {error: string}
}
