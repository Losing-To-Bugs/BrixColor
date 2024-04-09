import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Linking, TouchableOpacity, Touchable } from 'react-native';
import {Camera, useCameraDevices, useCameraDevice} from "react-native-vision-camera";
import React, {useEffect, useState, useRef} from 'react';

export default function App() {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = useCameraDevice('back');
  
  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${permission}`);
      if (permission === 'denied') await Linking.openSettings();
    }
    getPermission();
    }, [] );

    const frameProcessor = useFrameProcessor((frame) => {
      'worklet'
      console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`)
    }, [])

    if (device == null){
      return <Text style={{
        alignContent: 'center',
        padding: 50,
      }}>Camera not available</Text>
    }

    return (
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      ></Camera>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'gray',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  camButton: {
    
  },
  image: {

  },
});
