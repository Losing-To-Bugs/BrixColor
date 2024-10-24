import VisionCamera
import CoreImage
import CoreImage.CIFilterBuiltins

@objc(ColorDetectorPlugin)
public class ColorDetectorPlugin: FrameProcessorPlugin {
    public override init(proxy: VisionCameraProxyHolder, options: [AnyHashable : Any]! = [:]) {
        super.init(proxy: proxy, options: options)
    }

    func cannyEdgeDetector(inputImage: CIImage) -> CIImage {
        let filter = CIFilter.cannyEdgeDetector()
        filter.inputImage = inputImage
        filter.gaussianSigma = 5
        filter.perceptual = false
        filter.thresholdLow = 0.02
        filter.thresholdHigh = 0.05
        filter.hysteresisPasses = 1
        return filter.outputImage!
    }
    
    func floodFillEdges(edgeImage: CIImage) -> CIImage? {
        let context = CIContext()
        
        // Render the CIImage into a CGImage
        guard let cgImage = context.createCGImage(edgeImage, from: edgeImage.extent) else {
            return nil
        }
        
        // Create a CGContext to manipulate pixels
        let width = cgImage.width
        let height = cgImage.height
        let bitsPerComponent = cgImage.bitsPerComponent
        let bytesPerRow = cgImage.bytesPerRow
        let colorSpace = CGColorSpaceCreateDeviceGray()
        
        guard let contextRef = CGContext(data: nil,
                                         width: width,
                                         height: height,
                                         bitsPerComponent: bitsPerComponent,
                                         bytesPerRow: bytesPerRow,
                                         space: colorSpace,
                                         bitmapInfo: CGImageAlphaInfo.none.rawValue),
              let pixelData = contextRef.data else {
            return nil
        }
        
        // Copy the image data into the context
        contextRef.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))
        
        // Pixel buffer for manipulating the image data
        let pixels = pixelData.bindMemory(to: UInt8.self, capacity: width * height)
        
        // Fill pixels between the first and second white pixel in each row
        for y in 0..<height {
            var firstWhitePixel: Int? = nil
            var paintedPixels: [(Int, Int)] = []
            
            for x in 0..<width {
                let pixelIndex = y * bytesPerRow + x
                
                if pixels[pixelIndex] == 255 { // White pixel
                    if let start = firstWhitePixel {
                        // Second white pixel found, stop painting and reset painted pixels
                        if !paintedPixels.isEmpty {
                            // If there's an existing painted segment, we need to check if we should undo
                            undoPaint(pixels: pixels, paintedPixels: paintedPixels, bytesPerRow: bytesPerRow)
                            paintedPixels.removeAll() // Clear painted pixels for the next segment
                        }
                    }
                    
                    // Start tracking the first white pixel
                    firstWhitePixel = x
                } else if let _ = firstWhitePixel {
                    // Paint the pixel if we are between two white pixels
                    paintedPixels.append((x, y))
                    pixels[pixelIndex] = 255 // Paint white
                }
            }
            
            // At the end of the row, if there is one white pixel and painted pixels, undo painting
            if firstWhitePixel != nil && !paintedPixels.isEmpty {
                undoPaint(pixels: pixels, paintedPixels: paintedPixels, bytesPerRow: bytesPerRow)
            }
        }
        
        // Create a new CGImage with the filled mask
        guard let filledCGImage = contextRef.makeImage() else { return nil }
        
        // Convert back to CIImage
        return CIImage(cgImage: filledCGImage)
    }

    // Undo painting if there is only one white pixel in a row
    func undoPaint(pixels: UnsafeMutablePointer<UInt8>, paintedPixels: [(Int, Int)], bytesPerRow: Int) {
        for (x, y) in paintedPixels {
            let pixelIndex = y * bytesPerRow + x
            pixels[pixelIndex] = 0 // Reset to black (assuming 0 is black)
        }
    }

    
    func multiplyCompositing(inputImage: CIImage, backgroundImage: CIImage) -> CIImage {
        let colorBlendFilter = CIFilter.multiplyCompositing()
        colorBlendFilter.inputImage = inputImage
        colorBlendFilter.backgroundImage = backgroundImage
        return colorBlendFilter.outputImage!
    }
    
    // Function to compute the dominant color from the cropped image
    func computeDominantColor(from image: CIImage) -> [String: CGFloat]? {
        let context = CIContext()
        let extent = image.extent
        
        // Create a bitmap representation of the image
        guard let cgImage = context.createCGImage(image, from: extent) else { return nil }
        let width = cgImage.width
        let height = cgImage.height
        let bytesPerPixel = 4
        let bytesPerRow = bytesPerPixel * width
        let bitsPerComponent = 8
        
        // Create a buffer to hold pixel data
        var pixelData = [UInt8](repeating: 0, count: width * height * bytesPerPixel)
        
        // Create a CGContext to draw the image into the buffer
        let rgbColorSpace = CGColorSpaceCreateDeviceRGB()
        guard let contextRef = CGContext(data: &pixelData,
                                         width: width,
                                         height: height,
                                         bitsPerComponent: bitsPerComponent,
                                         bytesPerRow: bytesPerRow,
                                         space: rgbColorSpace,
                                         bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { return nil }
        
        contextRef.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))
        
        // Create a histogram to count colors
        var colorCount: [UInt32: Int] = [:]
        
        for y in 0..<height {
            for x in 0..<width {
                let pixelIndex = (y * width + x) * bytesPerPixel
                let r = pixelData[pixelIndex]
                let g = pixelData[pixelIndex + 1]
                let b = pixelData[pixelIndex + 2]
                let a = pixelData[pixelIndex + 3]
                
                // Skip transparent or black pixels
                if a == 0 || (r == 0 && g == 0 && b == 0) {
                    continue
                }
                
                let colorKey = UInt32(r) << 16 | UInt32(g) << 8 | UInt32(b) // RGB as a single UInt32
                colorCount[colorKey, default: 0] += 1 // Count occurrences of each color
            }
        }
        
        // Find the dominant color
        let dominantColor = colorCount.max(by: { $0.value < $1.value })?.key
        
        if let color = dominantColor {
            let r = CGFloat((color >> 16) & 0xFF) / 255.0
            let g = CGFloat((color >> 8) & 0xFF) / 255.0
            let b = CGFloat(color & 0xFF) / 255.0
            let a: CGFloat = 1.0
            
            // Return a dictionary with RGBA values
            return ["red": r, "green": g, "blue": b, "alpha": a]
        }
        return nil
    }
    
    
    
    public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable : Any]?) -> Any {
        let buffer = frame.buffer
        let orientation = frame.orientation
        
        // convert to CI image.
        guard let pixelBuf = CMSampleBufferGetImageBuffer(buffer) else {return 0}
        let ciImage = CIImage(cvPixelBuffer: pixelBuf)
        
// can be optimized to take in args and crop the image to the bounding box first
       /*
        // Get the dimensions of the image
        let imageHeight = ciImage.extent.height
         
        // make sure arguments were passed
        guard let args = arguments else {return ["error": "No args passed to frame detector"]}
            
        // check args valid
        guard let x = args["x"] as? CGFloat,
                let y = args["y"] as? CGFloat,
                let width = args["width"] as? CGFloat,
              let height = args["height"] as? CGFloat else {return ["error": "invalid arguments"]}
        
        // make sure the bounding box uses the bottom left instead of top left
        let bottomY = imageHeight - y - height
        
        // use the arguments to crop the image before detecting edges
        let cropRect = CGRect(x: x, y: bottomY, width: width, height: height)
        let cleanedImage = ciImage.cropped(to: cropRect)
        
        // create image with edges detected
        let edgesImage = cannyEdgeDetector(inputImage: cleanedImage)
        */
        
        let edgesImage = cannyEdgeDetector(inputImage: ciImage)
        
        // get mask
        guard let mask = floodFillEdges(edgeImage: edgesImage) else {return 0}
        
        
        // crop out the background
        let croppedImage = multiplyCompositing(inputImage: ciImage, backgroundImage: mask)
        
        
        
        if let dominantColor = computeDominantColor(from: croppedImage) {
                    // print("Dominant Color: \(dominantColor)")
                    return dominantColor
        } else {
            return ["error": "Cannot Detect Color"]
        }
    }
    
    
}
