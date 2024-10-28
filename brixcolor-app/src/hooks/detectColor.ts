import { VisionCameraProxy, Frame } from 'react-native-vision-camera'

const plugin = VisionCameraProxy.initFrameProcessorPlugin('detectColor', {})

export function detectColor(frame: Frame , options: {x: number, y: number, width: number, height: number}): {red: number, green: number, blue: number, alpha: number} | {error: string} {
    'worklet'
    if (plugin == null) {
        throw new Error("Failed to load Frame Processor Plugin!")
    }

    // const hScale = frame.height / 640
    // const wScale = frame.width / 640

    // scale and move the origin to bottom left of wanted area.
    // const newOptions = {
    //     x: (options.x * (0.8501934771)),
    //     y: (options.y * (1.15083154)),
    //     width: (options.width),
    //     height: (options.height)
    // }
    // keep trying
    const newOptions = {
        x: (options.x - (options.width)),
        y: (options.y  - (options.height / 2.0)),
        width: (options.width),
        height: (options.height)
    }
    console.log(newOptions);
    const result = plugin.call(frame , newOptions);

    return result as {red: number, green: number, blue: number, alpha: number} | {error: string}
}
