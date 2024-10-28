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
        filter.thresholdLow = 0.05
        filter.thresholdHigh = 0.15
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
            var doPaint = false
            var paintedCells : [Int] = []
            
            for x in 0..<width {
                let pixelIndex = y * bytesPerRow + x
                
                
                // if current is a white pixel
                if pixels[pixelIndex] == 255{
                    
                    // if already started, stop
                    if doPaint {
                        doPaint = false
                        
                        // if found next white, previous were valid
                        // clear these valid moves from the list
                        paintedCells.removeAll()
                    }
                    else{
                        // if haven't started, start now
                        doPaint = true
                    }
                }
                // if current pixel is not white
                else{
                    if doPaint{
                        pixels[pixelIndex] = 255
                        paintedCells.append(pixelIndex);
                    }
                    
                    // last cell, not white: means mistakenly painted cells, undo them
                    if (x == width - 1) && doPaint{
                        for i in paintedCells{
                            pixels[i] = 0
                        }
                    }
                    
                    
                }
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
        return ["red": 0, "green": 0, "blue": 0, "alpha": 1.0]
    }
    
    func saveCIImageToDisk(image: CIImage, filename: String, timeStamp: String) {
           let context = CIContext()
           guard let cgImage = context.createCGImage(image, from: image.extent) else { return }
           
           let uiImage = UIImage(cgImage: cgImage)
           if let data = uiImage.pngData() {
               let paths = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)
               let documentsDirectory = paths[0]
               let fileURL = documentsDirectory.appendingPathComponent("\(timeStamp)_\(filename).png")
               
               do {
                   try data.write(to: fileURL)
                   print("Saved image to \(fileURL)")
               } catch {
                   print("Error saving image: \(error)")
               }
           }
       }
    
    
    
    
    public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable : Any]?) -> Any {
        let buffer = frame.buffer
//        let orientation = frame.orientation
        
        // convert to CI image.
        guard let pixelBuf = CMSampleBufferGetImageBuffer(buffer) else {return ["error": "Cannot Detect Color"]}
        let ogImage = CIImage(cvPixelBuffer: pixelBuf)
        
        
        let dateFormatter = DateFormatter()
                dateFormatter.dateStyle = .short
                dateFormatter.timeStyle = .medium
                var timestamp = dateFormatter.string(from: Date())
                
                // Replace spaces, commas, and colons with underscores
                timestamp = timestamp.replacingOccurrences(of: " ", with: "_")
                    .replacingOccurrences(of: ":", with: "-")
                    .replacingOccurrences(of: ",", with: "")
                    .replacingOccurrences(of: "/", with: "_")

//        saveCIImageToDisk(image: ogImage, filename: "d-originalImage", timeStamp: timestamp)
        let edgesImage = cannyEdgeDetector(inputImage: ogImage)
//        saveCIImageToDisk(image: edgesImage, filename: "c-edges", timeStamp: timestamp)
        
        // get mask
        guard let mask = floodFillEdges(edgeImage: edgesImage) else {return ["error": "Cannot Detect Color"]}
        
//        saveCIImageToDisk(image: mask, filename: "b-filledMask", timeStamp: timestamp)
        
        // crop out the background
        let croppedImage = multiplyCompositing(inputImage: ogImage, backgroundImage: mask)
        
//        saveCIImageToDisk(image: croppedImage, filename: "a-croppedImage", timeStamp: timestamp)
        
        
//        saveCIImageToDisk(image: crop, filename: "c-filledMask", timeStamp: timestamp)
        
        if let dominantColor = computeDominantColor(from: croppedImage) {
                    // print("Dominant Color: \(dominantColor)")
                    return dominantColor
        } else {
            return ["error": "Cannot Detect Color"]
        }
    }
    
    
}
