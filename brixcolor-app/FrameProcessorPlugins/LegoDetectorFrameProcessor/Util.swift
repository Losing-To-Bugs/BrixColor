import CoreML
import CoreVideo
import CoreImage
import Accelerate
import UIKit
import Foundation

@available(iOS 15.0, *)
public func RGBtoRGBA(rgbBuffer: CVPixelBuffer) -> CVPixelBuffer? {
  // 1. Create empty vImageBuffer
  var vImageBuffer: vImage_Buffer = vImage_Buffer()
  
  // 2. create format for vImage where color space is RGB
  let vformat = vImageCVImageFormat_CreateWithCVPixelBuffer(rgbBuffer).takeRetainedValue()
  vImageCVImageFormat_SetColorSpace(vformat,
                                    CGColorSpaceCreateDeviceRGB())
  
  // 3. Create bitmapInfo (one of the two lines below should be correct
  //  let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.last.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)
  let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.none.rawValue)
  
  // 4. Create cg format
  var cgFormat = vImage_CGImageFormat(bitsPerComponent: 8,
                                      bitsPerPixel: 24,
                                      colorSpace: nil,
                                      bitmapInfo: bitmapInfo,
                                      version: 0,
                                      decode: nil,
                                      renderingIntent: .defaultIntent)
  
  // 5. Create vImageBuffer from CVPixelBuffer
  // (this function also allocates new memory for the vImageBuffer)
  let error = vImageBuffer_InitWithCVPixelBuffer(&vImageBuffer, &cgFormat, rgbBuffer, vformat, nil, vImage_Flags(kvImageNoFlags))
  
  
  // 6. Allocate memory for destination vImageBuffer for RGB to RGBA conversion
  let width = CVPixelBufferGetWidth(rgbBuffer)
  let height = CVPixelBufferGetHeight(rgbBuffer)


  let alignmentAndRowBytes = try? vImage_Buffer.preferredAlignmentAndRowBytes(
      width: width,
      height: height,
      bitsPerPixel: 32) // New bits per pixel is 32 (RGBA)


  let data = UnsafeMutableRawPointer.allocate(
      byteCount: alignmentAndRowBytes!.rowBytes * height,
      alignment: alignmentAndRowBytes!.alignment)
  
  var vImageBufferRGBA = vImage_Buffer(data: data,
                             height: vImagePixelCount(height),
                             width: vImagePixelCount(width),
                             rowBytes: alignmentAndRowBytes!.rowBytes)

  // Allocate memory for the destination RGB buffer
  // 7. Convert from RGBA -> RGBA
  let error2 = vImageConvert_RGB888toRGBA8888(&vImageBuffer, nil, 255, &vImageBufferRGBA, false, vImage_Flags(kvImageNoFlags))

  // 8. Creating new pixel buffer from vImageBuffer
  var dstPixelBuffer: CVPixelBuffer?

  
  let status = CVPixelBufferCreateWithBytes(nil,
                                            Int(vImageBufferRGBA.width),
                                            Int(vImageBufferRGBA.height),
                                            kCVPixelFormatType_32RGBA,
                                            vImageBufferRGBA.data,
                                            Int(vImageBufferRGBA.rowBytes),
                                            nil,
                                            nil,
                                            nil,
                                            &dstPixelBuffer
  )

  
  return dstPixelBuffer

}

@available(iOS 15.0, *)
public func RGBtoARGB(rgbBuffer: CVPixelBuffer) -> CVPixelBuffer? {
  // 1. Create empty vImageBuffer
  var vImageBuffer: vImage_Buffer = vImage_Buffer()
  
  // 2. create format for vImage where color space is RGB
  let vformat = vImageCVImageFormat_CreateWithCVPixelBuffer(rgbBuffer).takeRetainedValue()
  vImageCVImageFormat_SetColorSpace(vformat,
                                    CGColorSpaceCreateDeviceRGB())
  
  // 3. Create bitmapInfo (one of the two lines below should be correct
  //  let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.last.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)
  let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.none.rawValue)
  
  // 4. Create cg format
  var cgFormat = vImage_CGImageFormat(bitsPerComponent: 8,
                                      bitsPerPixel: 24,
                                      colorSpace: nil,
                                      bitmapInfo: bitmapInfo,
                                      version: 0,
                                      decode: nil,
                                      renderingIntent: .defaultIntent)
  
  // 5. Create vImageBuffer from CVPixelBuffer
  // (this function also allocates new memory for the vImageBuffer)
  let error = vImageBuffer_InitWithCVPixelBuffer(&vImageBuffer, &cgFormat, rgbBuffer, vformat, nil, vImage_Flags(kvImageNoFlags))
  
  
  // 6. Allocate memory for destination vImageBuffer for RGB to ARGB conversion
  let width = CVPixelBufferGetWidth(rgbBuffer)
  let height = CVPixelBufferGetHeight(rgbBuffer)


  let alignmentAndRowBytes = try? vImage_Buffer.preferredAlignmentAndRowBytes(
      width: width,
      height: height,
      bitsPerPixel: 32) // New bits per pixel is 32 (ARGB)


  let data = UnsafeMutableRawPointer.allocate(
      byteCount: alignmentAndRowBytes!.rowBytes * height,
      alignment: alignmentAndRowBytes!.alignment)
  
  var vImageBufferARGB = vImage_Buffer(data: data,
                             height: vImagePixelCount(height),
                             width: vImagePixelCount(width),
                             rowBytes: alignmentAndRowBytes!.rowBytes)

  // Allocate memory for the destination RGB buffer
  // 7. Convert from RGBA -> ARGB
  let error2 = vImageConvert_RGB888toARGB8888(&vImageBuffer, nil, 255, &vImageBufferARGB, false, vImage_Flags(kvImageNoFlags))

  // 8. Creating new pixel buffer from vImageBuffer
  var dstPixelBuffer: CVPixelBuffer?

  
  let status = CVPixelBufferCreateWithBytes(nil,
                                            Int(vImageBufferARGB.width),
                                            Int(vImageBufferARGB.height),
                                            kCVPixelFormatType_32ARGB,
                                            vImageBufferARGB.data,
                                            Int(vImageBufferARGB.rowBytes),
                                            nil,
                                            nil,
                                            nil,
                                            &dstPixelBuffer
  )

  return dstPixelBuffer

}

@available(iOS 15.0, *)
public func ARGBtoRGB(argbBuffer: CVPixelBuffer) -> CVPixelBuffer? {
  // 1. Create empty vImageBuffer
  var vImageBuffer: vImage_Buffer = vImage_Buffer()
  
  // 2. create format for vImage where color space is RGB
  let vformat = vImageCVImageFormat_CreateWithCVPixelBuffer(argbBuffer).takeRetainedValue()
  vImageCVImageFormat_SetColorSpace(vformat,
                                    CGColorSpaceCreateDeviceRGB())
  
  // 3. Create bitmapInfo
    let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.first.rawValue)
  
  // 4. Create cg format
  var cgFormat = vImage_CGImageFormat(bitsPerComponent: 8,
                                      bitsPerPixel: 32,
                                      colorSpace: nil,
                                      bitmapInfo: bitmapInfo,
                                      version: 0,
                                      decode: nil,
                                      renderingIntent: .defaultIntent)
  
  // 5. Create vImageBuffer from CVPixelBuffer
  // (this function also allocates new memory for the vImageBuffer)
  let error = vImageBuffer_InitWithCVPixelBuffer(&vImageBuffer, &cgFormat, argbBuffer, vformat, nil, vImage_Flags(kvImageNoFlags))
  
  // 6. Allocate memory for destination vImageBuffer for ARGB to RGB conversion
  let width = CVPixelBufferGetWidth(argbBuffer)
  let height = CVPixelBufferGetHeight(argbBuffer)


  let alignmentAndRowBytes = try? vImage_Buffer.preferredAlignmentAndRowBytes(
      width: width,
      height: height,
      bitsPerPixel: 24) // New bits per pixel is 24 (RGB)


  let data = UnsafeMutableRawPointer.allocate(
      byteCount: alignmentAndRowBytes!.rowBytes * height,
      alignment: alignmentAndRowBytes!.alignment)
  
  var vImageBufferRGB = vImage_Buffer(data: data,
                             height: vImagePixelCount(height),
                             width: vImagePixelCount(width),
                             rowBytes: alignmentAndRowBytes!.rowBytes)

  // 7. Convert from ARGB -> RGB
    let error2 = vImageConvert_ARGB8888toRGB888(&vImageBuffer, &vImageBufferRGB, vImage_Flags(kvImageNoFlags))

  // 8. Creating new pixel buffer from vImageBuffer
  var dstPixelBuffer: CVPixelBuffer?

  let status = CVPixelBufferCreateWithBytes(nil,
                                            Int(vImageBufferRGB.width),
                                            Int(vImageBufferRGB.height),
                                            kCVPixelFormatType_24RGB,
                                            vImageBufferRGB.data,
                                            Int(vImageBufferRGB.rowBytes),
                                            nil,
                                            nil,
                                            nil,
                                            &dstPixelBuffer
  )

  return dstPixelBuffer
}

@available(iOS 15.0, *)
func RGBAtoRGB(bgraBuffer: CVPixelBuffer) -> CVPixelBuffer? {
  // Pixel buffer (assumed to be in BGRA format) -> vImageBuffer
  
  // 1. Create empty vImageBuffer
  var vImageBuffer: vImage_Buffer = vImage_Buffer()
  
  // 2. create format for vImage where color space is RGB
  let vformat = vImageCVImageFormat_CreateWithCVPixelBuffer(bgraBuffer).takeRetainedValue()
  vImageCVImageFormat_SetColorSpace(vformat,
                                    CGColorSpaceCreateDeviceRGB())
  
  // 3. Create bitmapInfo (one of the two lines below should be correct
  //  let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.last.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)
  let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.last.rawValue)
  
  // 4. Create cg format
  var cgFormat = vImage_CGImageFormat(bitsPerComponent: 8,
                                      bitsPerPixel: 32,
                                      colorSpace: nil,
                                      bitmapInfo: bitmapInfo,
                                      version: 0,
                                      decode: nil,
                                      renderingIntent: .defaultIntent)
  
  // 5. Create vImageBuffer from CVPixelBuffer
  // (this function also allocates new memory for the vImageBuffer)
  let error = vImageBuffer_InitWithCVPixelBuffer(&vImageBuffer, &cgFormat, bgraBuffer, vformat, nil, vImage_Flags(kvImageNoFlags))
  
  // vformat is set to nil. if it doesnt work, uncomment top line and remove this one
//  let error = vImageBuffer_InitWithCVPixelBuffer(&vImageBuffer, &cgFormat, bgraBuffer, nil, nil, vImage_Flags(kvImageNoFlags))
  
  
  // 6. Allocate memory for destination vImageBuffer for BGRA to RGB conversion
  let width = CVPixelBufferGetWidth(bgraBuffer)
  let height = CVPixelBufferGetHeight(bgraBuffer)


  let alignmentAndRowBytes = try? vImage_Buffer.preferredAlignmentAndRowBytes(
      width: width,
      height: height,
      bitsPerPixel: 24) // New bits per pixel is 24 (RGB)


  let data = UnsafeMutableRawPointer.allocate(
      byteCount: alignmentAndRowBytes!.rowBytes * height,
      alignment: alignmentAndRowBytes!.alignment)
  
  var vImageBufferRGB = vImage_Buffer(data: data,
                             height: vImagePixelCount(height),
                             width: vImagePixelCount(width),
                             rowBytes: alignmentAndRowBytes!.rowBytes)

  // Allocate memory for the destination RGB buffer
  // 7. Convert from BGRA -> RGB

  
  let error2 = vImageConvert_RGBA8888toRGB888(&vImageBuffer, &vImageBufferRGB, vImage_Flags(kvImageNoFlags))
  
  // 8. Creating new pixel buffer from vImageBuffer
  
  var dstPixelBuffer: CVPixelBuffer?

  
  let status = CVPixelBufferCreateWithBytes(nil,
                                            Int(vImageBufferRGB.width),
                                            Int(vImageBufferRGB.height),
                                            kCVPixelFormatType_24RGB,
                                            vImageBufferRGB.data,
                                            Int(vImageBufferRGB.rowBytes),
                                            nil,
                                            nil,
                                            nil,
                                            &dstPixelBuffer
  )
  
  return dstPixelBuffer
}



@available(iOS 15.0, *)
func RGBAtoRGBUIImage(rgbaBuffer: CVPixelBuffer) -> UIImage? {
  // Pixel buffer (assumed to be in BGRA format) -> vImageBuffer
  
  // 1. Create empty vImageBuffer
  var vImageBuffer: vImage_Buffer = vImage_Buffer()
  
  // 2. create format for vImage where color space is RGB
  let vformat = vImageCVImageFormat_CreateWithCVPixelBuffer(rgbaBuffer).takeRetainedValue()
  vImageCVImageFormat_SetColorSpace(vformat,
                                    CGColorSpaceCreateDeviceRGB())
  
  // 3. Create bitmapInfo (one of the two lines below should be correct
  //  let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.last.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)
  let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.last.rawValue)
  
  // 4. Create cg format
  var cgFormat = vImage_CGImageFormat(bitsPerComponent: 8,
                                      bitsPerPixel: 32,
                                      colorSpace: nil,
                                      bitmapInfo: bitmapInfo,
                                      version: 0,
                                      decode: nil,
                                      renderingIntent: .defaultIntent)
  
  // 5. Create vImageBuffer from CVPixelBuffer
  // (this function also allocates new memory for the vImageBuffer)
  let error = vImageBuffer_InitWithCVPixelBuffer(&vImageBuffer, &cgFormat, rgbaBuffer, vformat, nil, vImage_Flags(kvImageNoFlags))
  
  // vformat is set to nil. if it doesnt work, uncomment top line and remove this one
//  let error = vImageBuffer_InitWithCVPixelBuffer(&vImageBuffer, &cgFormat, bgraBuffer, nil, nil, vImage_Flags(kvImageNoFlags))
  
  
  // 6. Allocate memory for destination vImageBuffer for BGRA to RGB conversion
  let width = CVPixelBufferGetWidth(rgbaBuffer)
  let height = CVPixelBufferGetHeight(rgbaBuffer)


  let alignmentAndRowBytes = try? vImage_Buffer.preferredAlignmentAndRowBytes(
      width: width,
      height: height,
      bitsPerPixel: 24) // New bits per pixel is 24 (RGB)


  let data = UnsafeMutableRawPointer.allocate(
      byteCount: alignmentAndRowBytes!.rowBytes * height,
      alignment: alignmentAndRowBytes!.alignment)
  
  var vImageBufferRGB = vImage_Buffer(data: data,
                             height: vImagePixelCount(height),
                             width: vImagePixelCount(width),
                             rowBytes: alignmentAndRowBytes!.rowBytes)

  // Allocate memory for the destination RGB buffer
  // 7. Convert from BGRA -> RGB

  
  let error2 = vImageConvert_RGBA8888toRGB888(&vImageBuffer, &vImageBufferRGB, vImage_Flags(kvImageNoFlags))
  
  // 8. Creating new pixel buffer from vImageBuffer
  
  var dstPixelBuffer: CVPixelBuffer?

  
  let status = CVPixelBufferCreateWithBytes(nil,
                                            Int(vImageBufferRGB.width),
                                            Int(vImageBufferRGB.height),
                                            kCVPixelFormatType_24RGB,
                                            vImageBufferRGB.data,
                                            Int(vImageBufferRGB.rowBytes),
                                            nil,
                                            nil,
                                            nil,
                                            &dstPixelBuffer
  )

  
  var cgFormatRGB = vImage_CGImageFormat(bitsPerComponent: 8,
                                      bitsPerPixel: 24,
                                      colorSpace: nil,
                                         bitmapInfo: CGBitmapInfo(rawValue: CGImageAlphaInfo.none.rawValue),
                                      version: 0,
                                      decode: nil,
                                      renderingIntent: .defaultIntent)

  let destCGImage = vImageCreateCGImageFromBuffer(&vImageBufferRGB, &cgFormatRGB, nil, nil, vImage_Flags(kvImageNoFlags), nil)?.takeRetainedValue()


  // Create a UIImage
  let exportedImage = destCGImage.flatMap { UIImage(cgImage: $0) }
  
  return exportedImage
}


@available(iOS 15.0, *)
public func ARGBtoRGBUIImage(argbBuffer: CVPixelBuffer) -> UIImage? {
  // 1. Create empty vImageBuffer
  var vImageBuffer: vImage_Buffer = vImage_Buffer()
  
  // 2. create format for vImage where color space is RGB
  let vformat = vImageCVImageFormat_CreateWithCVPixelBuffer(argbBuffer).takeRetainedValue()
  vImageCVImageFormat_SetColorSpace(vformat,
                                    CGColorSpaceCreateDeviceRGB())
  
  // 3. Create bitmapInfo
    let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.first.rawValue)
  
  // 4. Create cg format
  var cgFormat = vImage_CGImageFormat(bitsPerComponent: 8,
                                      bitsPerPixel: 32,
                                      colorSpace: nil,
                                      bitmapInfo: bitmapInfo,
                                      version: 0,
                                      decode: nil,
                                      renderingIntent: .defaultIntent)
  
  // 5. Create vImageBuffer from CVPixelBuffer
  // (this function also allocates new memory for the vImageBuffer)
  let error = vImageBuffer_InitWithCVPixelBuffer(&vImageBuffer, &cgFormat, argbBuffer, vformat, nil, vImage_Flags(kvImageNoFlags))
  
  // 6. Allocate memory for destination vImageBuffer for ARGB to RGB conversion
  let width = CVPixelBufferGetWidth(argbBuffer)
  let height = CVPixelBufferGetHeight(argbBuffer)


  let alignmentAndRowBytes = try? vImage_Buffer.preferredAlignmentAndRowBytes(
      width: width,
      height: height,
      bitsPerPixel: 24) // New bits per pixel is 24 (RGB)


  let data = UnsafeMutableRawPointer.allocate(
      byteCount: alignmentAndRowBytes!.rowBytes * height,
      alignment: alignmentAndRowBytes!.alignment)
  
  var vImageBufferRGB = vImage_Buffer(data: data,
                             height: vImagePixelCount(height),
                             width: vImagePixelCount(width),
                             rowBytes: alignmentAndRowBytes!.rowBytes)

  // 7. Convert from ARGB -> RGB
    let error2 = vImageConvert_ARGB8888toRGB888(&vImageBuffer, &vImageBufferRGB, vImage_Flags(kvImageNoFlags))

  // 8. Creating new pixel buffer from vImageBuffer
  var dstPixelBuffer: CVPixelBuffer?

  let status = CVPixelBufferCreateWithBytes(nil,
                                            Int(vImageBufferRGB.width),
                                            Int(vImageBufferRGB.height),
                                            kCVPixelFormatType_24RGB,
                                            vImageBufferRGB.data,
                                            Int(vImageBufferRGB.rowBytes),
                                            nil,
                                            nil,
                                            nil,
                                            &dstPixelBuffer
  )

    
    var cgFormatRGB = vImage_CGImageFormat(bitsPerComponent: 8,
                                        bitsPerPixel: 24,
                                        colorSpace: nil,
                                           bitmapInfo: CGBitmapInfo(rawValue: CGImageAlphaInfo.none.rawValue),
                                        version: 0,
                                        decode: nil,
                                        renderingIntent: .defaultIntent)

    let destCGImage = vImageCreateCGImageFromBuffer(&vImageBufferRGB, &cgFormatRGB, nil, nil, vImage_Flags(kvImageNoFlags), nil)?.takeRetainedValue()


    // Create a UIImage
    let exportedImage = destCGImage.flatMap { UIImage(cgImage: $0) }
    
    return exportedImage
}

@available(iOS 15.0, *)
public func RGBBuffertoUIImage(rgbBuffer: CVPixelBuffer) -> UIImage? {
    // 1. Create empty vImageBuffer
    var vImageBuffer: vImage_Buffer = vImage_Buffer()
    
    // 2. create format for vImage where color space is RGB
    let vformat = vImageCVImageFormat_CreateWithCVPixelBuffer(rgbBuffer).takeRetainedValue()
    vImageCVImageFormat_SetColorSpace(vformat,
                                      CGColorSpaceCreateDeviceRGB())
    
    // 3. Create bitmapInfo (one of the two lines below should be correct
    //  let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.last.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)
    let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.none.rawValue)
    
    // 4. Create cg format
    var cgFormat = vImage_CGImageFormat(bitsPerComponent: 8,
                                        bitsPerPixel: 24,
                                        colorSpace: nil,
                                        bitmapInfo: bitmapInfo,
                                        version: 0,
                                        decode: nil,
                                        renderingIntent: .defaultIntent)
    
    // 5. Create vImageBuffer from CVPixelBuffer
    // (this function also allocates new memory for the vImageBuffer)
    let error = vImageBuffer_InitWithCVPixelBuffer(&vImageBuffer, &cgFormat, rgbBuffer, vformat, nil, vImage_Flags(kvImageNoFlags))

    // 6. Create CG Image from vImageBuffer
      let destCGImage = vImageCreateCGImageFromBuffer(&vImageBuffer, &cgFormat, nil, nil, vImage_Flags(kvImageNoFlags), nil)?.takeRetainedValue()


      // Create a UIImage
      let exportedImage = destCGImage.flatMap { UIImage(cgImage: $0) }
      
      return exportedImage
}

@available(iOS 15.0, *)
public func ARGBBuffertoCGImage(argbBuffer: CVPixelBuffer) -> CGImage? {
    // 1. Create empty vImageBuffer
    var vImageBuffer: vImage_Buffer = vImage_Buffer()
    
    // 2. create format for vImage where color space is RGB
    let vformat = vImageCVImageFormat_CreateWithCVPixelBuffer(argbBuffer).takeRetainedValue()
    vImageCVImageFormat_SetColorSpace(vformat,
                                      CGColorSpaceCreateDeviceRGB())
    
    // 3. Create bitmapInfo (one of the two lines below should be correct
    //  let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.last.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)
    let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.first.rawValue)
    
    // 4. Create cg format
    var cgFormat = vImage_CGImageFormat(bitsPerComponent: 8,
                                        bitsPerPixel: 32,
                                        colorSpace: nil,
                                        bitmapInfo: bitmapInfo,
                                        version: 0,
                                        decode: nil,
                                        renderingIntent: .defaultIntent)
    
    // 5. Create vImageBuffer from CVPixelBuffer
    // (this function also allocates new memory for the vImageBuffer)
    let error = vImageBuffer_InitWithCVPixelBuffer(&vImageBuffer, &cgFormat, argbBuffer, vformat, nil, vImage_Flags(kvImageNoFlags))

    // 6. Create CG Image from vImageBuffer
      let destCGImage = vImageCreateCGImageFromBuffer(&vImageBuffer, &cgFormat, nil, nil, vImage_Flags(kvImageNoFlags), nil)?.takeRetainedValue()
    
      return destCGImage
}

@available(iOS 15.0, *)
public func ARGBBuffertoUIImage(argbBuffer: CVPixelBuffer) -> UIImage? {
    // 1. Create empty vImageBuffer
    var vImageBuffer: vImage_Buffer = vImage_Buffer()
    
    // 2. create format for vImage where color space is RGB
    let vformat = vImageCVImageFormat_CreateWithCVPixelBuffer(argbBuffer).takeRetainedValue()
    vImageCVImageFormat_SetColorSpace(vformat,
                                      CGColorSpaceCreateDeviceRGB())
    
    // 3. Create bitmapInfo (one of the two lines below should be correct
    //  let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.last.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)
    let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.first.rawValue)
    
    // 4. Create cg format
    var cgFormat = vImage_CGImageFormat(bitsPerComponent: 8,
                                        bitsPerPixel: 32,
                                        colorSpace: nil,
                                        bitmapInfo: bitmapInfo,
                                        version: 0,
                                        decode: nil,
                                        renderingIntent: .defaultIntent)
    
    // 5. Create vImageBuffer from CVPixelBuffer
    // (this function also allocates new memory for the vImageBuffer)
    let error = vImageBuffer_InitWithCVPixelBuffer(&vImageBuffer, &cgFormat, argbBuffer, vformat, nil, vImage_Flags(kvImageNoFlags))

    // 6. Create CG Image from vImageBuffer
      let destCGImage = vImageCreateCGImageFromBuffer(&vImageBuffer, &cgFormat, nil, nil, vImage_Flags(kvImageNoFlags), nil)?.takeRetainedValue()


      // Create a UIImage
      let exportedImage = destCGImage.flatMap { UIImage(cgImage: $0) }
      
      return exportedImage
}

@available(iOS 15.0, *)
public func RGBABuffertoUIImage(rgbaBuffer: CVPixelBuffer) -> UIImage? {
    // 1. Create empty vImageBuffer
    var vImageBuffer: vImage_Buffer = vImage_Buffer()
    
    // 2. create format for vImage where color space is RGB
    let vformat = vImageCVImageFormat_CreateWithCVPixelBuffer(rgbaBuffer).takeRetainedValue()
    vImageCVImageFormat_SetColorSpace(vformat,
                                      CGColorSpaceCreateDeviceRGB())
    
    // 3. Create bitmapInfo (one of the two lines below should be correct
    //  let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.last.rawValue | CGBitmapInfo.byteOrder32Little.rawValue)
    let bitmapInfo:CGBitmapInfo = CGBitmapInfo(rawValue: CGImageAlphaInfo.last.rawValue)
    
    // 4. Create cg format
    var cgFormat = vImage_CGImageFormat(bitsPerComponent: 8,
                                        bitsPerPixel: 32,
                                        colorSpace: nil,
                                        bitmapInfo: bitmapInfo,
                                        version: 0,
                                        decode: nil,
                                        renderingIntent: .defaultIntent)
    
    // 5. Create vImageBuffer from CVPixelBuffer
    // (this function also allocates new memory for the vImageBuffer)
    let error = vImageBuffer_InitWithCVPixelBuffer(&vImageBuffer, &cgFormat, rgbaBuffer, vformat, nil, vImage_Flags(kvImageNoFlags))

    // 6. Create CG Image from vImageBuffer
      let destCGImage = vImageCreateCGImageFromBuffer(&vImageBuffer, &cgFormat, nil, nil, vImage_Flags(kvImageNoFlags), nil)?.takeRetainedValue()


      // Create a UIImage
      let exportedImage = destCGImage.flatMap { UIImage(cgImage: $0) }
      
      return exportedImage
}

@available(iOS 15.0, *)
func RGBAtoARGB(rgbaBuffer: CVPixelBuffer) -> CVPixelBuffer? {
    guard let rgbBuffer = RGBAtoRGB(bgraBuffer: rgbaBuffer) else {
        return nil
    }
  
    CVPixelBufferGetBaseAddress(rgbBuffer)?.deallocate()
    
    guard let argbBuffer = RGBtoARGB(rgbBuffer: rgbBuffer) else {
        return nil
    }
    
    return argbBuffer
}

@available(iOS 15.0, *)
func ARGBtoRGBA(argbBuffer: CVPixelBuffer) -> CVPixelBuffer? {
    guard let rgbBuffer = ARGBtoRGB(argbBuffer: argbBuffer) else {
        print("ARGB to RGB conversion failed")
        return nil
    }
    
    guard let rgbaBuffer = RGBtoRGBA(rgbBuffer: rgbBuffer) else {
        print("RGB to RGBA conversion failed", CVPixelBufferGetPixelFormatType(rgbBuffer))
        return nil
    }
    
    return rgbaBuffer
}

extension CGImagePropertyOrientation {
    init(_ uiOrientation: UIImage.Orientation) {
        switch uiOrientation {
            case .up: self = .up
            case .upMirrored: self = .upMirrored
            case .down: self = .down
            case .downMirrored: self = .downMirrored
            case .left: self = .left
            case .leftMirrored: self = .leftMirrored
            case .right: self = .right
            case .rightMirrored: self = .rightMirrored
        }
    }
}

extension CGImage {
    func resize(size:CGSize) -> CGImage? {
        let width: Int = Int(size.width)
        let height: Int = Int(size.height)

        let bytesPerPixel = self.bitsPerPixel / self.bitsPerComponent
        let destBytesPerRow = width * bytesPerPixel


        guard let colorSpace = self.colorSpace else { return nil }
        guard let context = CGContext(data: nil, width: width, height: height, bitsPerComponent: self.bitsPerComponent, bytesPerRow: destBytesPerRow, space: colorSpace, bitmapInfo: self.alphaInfo.rawValue) else { return nil }

        context.interpolationQuality = .high
        context.draw(self, in: CGRect(x: 0, y: 0, width: width, height: height))

        return context.makeImage()
    }
}

func imageFromBuffer(_ pixelBuffer: CVPixelBuffer) -> UIImage? {
    // Create a CIImage from the pixel buffer
    let ciImage = CIImage(cvPixelBuffer: pixelBuffer)
    
    // Create a CIContext to render the CIImage
    let context = CIContext()
    
    // Get the width and height of the pixel buffer
    let width = CVPixelBufferGetWidth(pixelBuffer)
    let height = CVPixelBufferGetHeight(pixelBuffer)
    
    // Create a CGImage from the CIImage
    if let cgImage = context.createCGImage(ciImage, from: CGRect(x: 0, y: 0, width: width, height: height)) {
        // Convert the CGImage to UIImage
        return UIImage(cgImage: cgImage)
    }

    return nil
}

func resizeCIImage(image: CIImage, targetSize: CGSize) -> CIImage? {
    // Calculate the scaling factors for width and height
    let scaleX = targetSize.width / image.extent.width
    let scaleY = targetSize.height / image.extent.height

    // Apply the scaling transformation to resize the image
    let scaleTransform = CGAffineTransform(scaleX: scaleX, y: scaleY)
    let scaledImage = image.transformed(by: scaleTransform)

    return scaledImage
}

func resizeAndPad(image: CIImage, targetSize: CGSize = CGSize(width: 640, height: 640)) -> UIImage? {
    // Create a CIContext
    let context = CIContext(options: nil)

    // Get the current image size
    let imageRect = image.extent

    // Calculate the scale factor to fit the image within the target size
    let widthScale = targetSize.width / imageRect.width
    let heightScale = targetSize.height / imageRect.height
    let scaleFactor = min(widthScale, heightScale)

    // Calculate the new size with aspect ratio maintained
    let scaledWidth = imageRect.width * scaleFactor
    let scaledHeight = imageRect.height * scaleFactor

    // Create a new rect centered within the target size
    let xOffset = (targetSize.width - scaledWidth) / 2
    let yOffset = (targetSize.height - scaledHeight) / 2
    let drawRect = CGRect(x: xOffset, y: yOffset, width: scaledWidth, height: scaledHeight)

    // Create a white background image
    UIGraphicsBeginImageContextWithOptions(targetSize, true, 0)
    UIColor.white.setFill()
    UIRectFill(CGRect(origin: .zero, size: targetSize))

    // Render the CIImage into the context
    if let cgImage = context.createCGImage(image, from: image.extent) {
        UIImage(cgImage: cgImage).draw(in: drawRect)
    }

    // Capture the result
    let paddedImage = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()

    return paddedImage
}

@available(iOS 15.0, *)
func extractOutput(result: MLMultiArray) -> Any? {
    

    var maxConf = 0.0
    var maxConfCol = 0
    var maxConfRow = 0

    for col in 0...result.shape[2].intValue-1 {

        for row in 4...result.shape[1].intValue-1 {
            let conf = result[[0, row as NSNumber, col as NSNumber]]

            if conf.doubleValue > maxConf {
                maxConf = conf.doubleValue
                maxConfCol = col
                maxConfRow = row
            }

        }
    }

    return [
        "cls": maxConfRow - 4,
        "conf": maxConf,
        "w":result[[0, 2, maxConfCol as NSNumber]],
        "h":result[[0, 3, maxConfCol as NSNumber]],
        "x":result[[0, 0, maxConfCol as NSNumber]],
        "y":result[[0, 1, maxConfCol as NSNumber]],
    ]
}

//@available(iOS 15.0, *)
//func extractOutput(output: BrixModelOuput) -> Dictionary<String, NSNumber> {
//    var maxConf = 0.0
//    var maxConfCol = 0
//
//
//    for col in 0...output.confidence.count-1 {
//        let conf = output.confidence[col]
//        if conf.doubleValue > maxConf {
//            maxConf = conf.doubleValue
//            maxConfCol = col
//        }
//    }
//
//
//    return [
//        "cls": NSNumber(value: maxConfCol),
//        "conf": NSNumber(value: maxConf),
//        "w":output.coordinates[2],
//        "h":output.coordinates[3],
//        "x":output.coordinates[0],
//        "y":output.coordinates[1],
//    ]
//}

func bufferFromImage32RGBA(from image: UIImage) -> CVPixelBuffer? {
  let attrs = [kCVPixelBufferCGImageCompatibilityKey: kCFBooleanTrue, kCVPixelBufferCGBitmapContextCompatibilityKey: kCFBooleanTrue] as CFDictionary
  var pixelBuffer : CVPixelBuffer?
  let status = CVPixelBufferCreate(kCFAllocatorDefault, Int(image.size.width), Int(image.size.height), kCVPixelFormatType_32RGBA, attrs, &pixelBuffer)
  guard (status == kCVReturnSuccess) else {
    return nil
  }

  CVPixelBufferLockBaseAddress(pixelBuffer!, CVPixelBufferLockFlags(rawValue: 0))
  let pixelData = CVPixelBufferGetBaseAddress(pixelBuffer!)

  let rgbColorSpace = CGColorSpaceCreateDeviceRGB()
  let context = CGContext(data: pixelData, width: Int(image.size.width), height: Int(image.size.height), bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(pixelBuffer!), space: rgbColorSpace, bitmapInfo: CGImageAlphaInfo.last.rawValue)

  context?.translateBy(x: 0, y: image.size.height)
  context?.scaleBy(x: 1.0, y: -1.0)

  UIGraphicsPushContext(context!)
  image.draw(in: CGRect(x: 0, y: 0, width: image.size.width, height: image.size.height))
  UIGraphicsPopContext()
  CVPixelBufferUnlockBaseAddress(pixelBuffer!, CVPixelBufferLockFlags(rawValue: 0))

  return pixelBuffer
}

func bufferFromImage24RGB(from image: UIImage) -> CVPixelBuffer? {
  let attrs = [kCVPixelBufferCGImageCompatibilityKey: kCFBooleanTrue, kCVPixelBufferCGBitmapContextCompatibilityKey: kCFBooleanTrue] as CFDictionary
  var pixelBuffer : CVPixelBuffer?
  let status = CVPixelBufferCreate(kCFAllocatorDefault, Int(image.size.width), Int(image.size.height), kCVPixelFormatType_24RGB, attrs, &pixelBuffer)
  guard (status == kCVReturnSuccess) else {
    return nil
  }

  CVPixelBufferLockBaseAddress(pixelBuffer!, CVPixelBufferLockFlags(rawValue: 0))
  let pixelData = CVPixelBufferGetBaseAddress(pixelBuffer!)

  let rgbColorSpace = CGColorSpaceCreateDeviceRGB()
  let context = CGContext(data: pixelData, width: Int(image.size.width), height: Int(image.size.height), bitsPerComponent: 8, bytesPerRow: CVPixelBufferGetBytesPerRow(pixelBuffer!), space: rgbColorSpace, bitmapInfo: CGImageAlphaInfo.none.rawValue)

  context?.translateBy(x: 0, y: image.size.height)
  context?.scaleBy(x: 1.0, y: -1.0)

  UIGraphicsPushContext(context!)
  image.draw(in: CGRect(x: 0, y: 0, width: image.size.width, height: image.size.height))
  UIGraphicsPopContext()
  CVPixelBufferUnlockBaseAddress(pixelBuffer!, CVPixelBufferLockFlags(rawValue: 0))

  return pixelBuffer
}


func getPixelValue(cgImage: CGImage, coords: [Int]) -> [NSNumber] {
   if let pixelData = cgImage.dataProvider?.data {
       let data: UnsafePointer<UInt8> = CFDataGetBytePtr(pixelData)

       // Check that data is not nil and has valid length
       let bytesPerPixel = cgImage.bitsPerPixel / 8
       let width = cgImage.width
       let height = cgImage.height

       if width > 0 && height > 0 {
           let pixelInfo: Int = coords[1] * cgImage.bytesPerRow + coords[0] * bytesPerPixel // Pixel at (0, 0)

           // Ensure pixelInfo is within valid bounds
           if pixelInfo >= 0 && pixelInfo + bytesPerPixel <= CFDataGetLength(pixelData) {
               let red = data[pixelInfo]
               let green = data[pixelInfo + 1]
               let blue = data[pixelInfo + 2]
               let alpha = data[pixelInfo + 3]

//               print("CG RGBA at (0, 0): (\(red), \(green), \(blue), \(alpha))")
             return [NSNumber(value: red), NSNumber(value: green) , NSNumber(value: blue)
                     ,NSNumber(value: alpha)
             ]
           } else {
             print("Error: pixelInfo is out of bounds." )
             return [NSNumber(value: bytesPerPixel), NSNumber(value:pixelInfo), NSNumber(value:Int(CFDataGetLength(pixelData)))]
           }
       } else {
           print("Error: Invalid image dimensions.")
         return [-2]
       }
   } else {
       print("Error: Could not retrieve pixel data.")
     return [-1]
   }
}

@available(iOS 15.0, *)
func multiArrayToNMSPredictions(result: MLMultiArray, treshold: Double = 0.5) -> [NMSPrediction] {


    var maxConf = 0.0
    var maxConfCol = 0
    var maxConfRow = 0

  var nmsPreds = [] as [NMSPrediction]

    for col in 0...result.shape[2].intValue-1 {

      let rect = CGRect(
        x: CGFloat(truncating: result[[0, 0, col as NSNumber]]),
        y: CGFloat(truncating: result[[0, 1, col as NSNumber]]),
        width: CGFloat(truncating: result[[0, 2, col as NSNumber]]),
        height: CGFloat(truncating: result[[0, 3, col as NSNumber]])
      )

      var score = 0.0
      var classIdx = 0

        for row in 4...result.shape[1].intValue-1 {
            let conf = result[[0, row as NSNumber, col as NSNumber]]

            if conf.doubleValue > maxConf {
                maxConf = conf.doubleValue
                maxConfCol = col
                maxConfRow = row
            }

          if conf.doubleValue > score {
            score = conf.doubleValue
            classIdx = row - 4
          }

        }

      if score > treshold {
        nmsPreds.append((classIdx, Float(score), rect))
      }
    }

  let selectedIdx = nonMaxSuppression(predictions: nmsPreds, iouThreshold: 0.45, maxBoxes: 12)

  let selected = selectedIdx.map{ nmsPreds[$0]  }

    return selected
}

func scaleFit(image: UIImage, targetSize: CGSize = CGSize(width: 640, height: 640)) -> UIImage? {
    let originalSize = image.size

    // Calculate the scale factor that preserves the aspect ratio
    let widthRatio = targetSize.width / originalSize.width
    let heightRatio = targetSize.height / originalSize.height
    let scaleFactor = min(widthRatio, heightRatio)

    // Compute the new size while maintaining aspect ratio
    let scaledSize = CGSize(width: originalSize.width * scaleFactor,
                            height: originalSize.height * scaleFactor)

    // Create a new white background image of targetSize
    UIGraphicsBeginImageContextWithOptions(targetSize, false, 0.0)

    // Fill the background with white
    UIColor.white.setFill()
    let backgroundRect = CGRect(origin: .zero, size: targetSize)
    UIRectFill(backgroundRect)

    // Draw the scaled image centered in the background
    let xOffset = (targetSize.width - scaledSize.width) / 2
    let yOffset = (targetSize.height - scaledSize.height) / 2
    let drawRect = CGRect(origin: CGPoint(x: xOffset, y: yOffset), size: scaledSize)

    image.draw(in: drawRect)

    // Get the final image from the context
    let resizedImage = UIGraphicsGetImageFromCurrentImageContext()

    // End the context
    UIGraphicsEndImageContext()

    return resizedImage
}


func convertToGrayscale(image: UIImage) -> UIImage? {
    // Convert UIImage to CIImage, passing the orientation in the options dictionary
    guard let ciImage = CIImage(image: image, options: [CIImageOption.applyOrientationProperty: true]) else {
        return nil
    }

    // Apply grayscale filter
    let grayscaleFilter = CIFilter(name: "CIPhotoEffectMono")
    grayscaleFilter?.setValue(ciImage, forKey: kCIInputImageKey)

    // Get the output CIImage from the filter
    guard let outputCIImage = grayscaleFilter?.outputImage else {
        return nil
    }

    // Convert CIImage back to UIImage, preserving the original orientation
    let context = CIContext()
    guard let cgImage = context.createCGImage(outputCIImage, from: outputCIImage.extent) else {
        return nil
    }

    // Return a UIImage with the original orientation
    return UIImage(cgImage: cgImage, scale: image.scale, orientation: image.imageOrientation)
}

@available(iOS 15.0, *)
func noNmsExtract(result: MLMultiArray, threshold: Double = 0.5) -> [NMSPrediction] {
  var nmsPreds = [] as [NMSPrediction]

  for row in 0...result.shape[1].intValue-1 {
    let width = result[[0, row as NSNumber, 2 ]].doubleValue - result[[0, row as NSNumber, 0]].doubleValue
    let height = result[[0, row as NSNumber, 3 ]].doubleValue - result[[0, row as NSNumber, 1]].doubleValue

    let rect = CGRect(
      x: CGFloat(truncating: result[[0, row as NSNumber, 0]]),
      y: CGFloat(truncating: result[[0, row as NSNumber, 1 ]]),
      width: CGFloat(width),
      height: CGFloat(height)

    )

    let score = result[[0, row as NSNumber, 4 ]]
    let label = result[[0, row as NSNumber, 5 ]]



    if score.doubleValue > threshold {
      nmsPreds.append((label.intValue, Float(truncating: score), rect))
    }
  }

  nmsPreds.forEach{ print($0.0, $0.1, threshold ) }

  return nmsPreds
}
