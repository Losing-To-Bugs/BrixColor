import { VisionCameraProxy, Frame } from 'react-native-vision-camera'

const plugin = VisionCameraProxy.initFrameProcessorPlugin('detectColor', {})

export function detectColor(frame: Frame, x: number, y: number, width: number, height: number): {red: number, green: number, blue: number, alpha: number} | {error: string} {
    'worklet'
    if (plugin == null) {
        throw new Error("Failed to load Frame Processor Plugin!")
    }

    const options = {
        x: x,
        y: y,
        width: width,
        height: height
    };

    const result = plugin.call(frame, options);

    return result as {red: number, green: number, blue: number, alpha: number} | {error: string}
}
