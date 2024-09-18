// import {Button, Text, View} from "react-native";
// import {useCameraPermissions, CameraProps, CameraView} from "expo-camera";
// import {forwardRef} from "react";
//
// export type ScanCameraProps = CameraProps & {
//     flashOn: boolean,
// }
//
// const ScanCamera = forwardRef(function (props: ScanCameraProps, ref) {
//     const [permission, requestPermission] = useCameraPermissions()
//
//     if (!permission) {
//         return (<View>
//         </View>)
//     }
//
//     if (!permission.granted) {
//         return (<View style={props.style}>
//             <Text>Please grant access to camera usage in app settings.</Text>
//             <Button
//                 title="Request Permission"
//                 onPress={() => requestPermission()}
//             />
//         </View>)
//     }
//
//     return (<>
//         <View style={[props.style, {backgroundColor: 'black'}]}>
//             <CameraView style={{width: '100%', height: '100%'}} type={'back'} flashMode={props.flashOn ? 'torch' : 'off'} ref={ref}>
//                 {props.children}
//             </CameraView>
//         </View>
//     </>)
// })
//
// export default ScanCamera