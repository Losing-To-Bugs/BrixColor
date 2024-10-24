import { useEffect, useState, useRef } from "react";
import { VolumeManager } from "react-native-volume-manager";

interface VolumeCaptureProps {
  handleShutterPress: () => Promise<void>;
}

const VolumeCapture: React.FC<VolumeCaptureProps> = ({
  handleShutterPress,
}) => {

  const originalVolumeRef = useRef<number>(0); 
  let debounceTimeout: NodeJS.Timeout | undefined;

  const setVolumeWithoutChange = async (volume: number) => {
    await VolumeManager.setVolume(volume); 
  };

  useEffect(() => {
    const fetchCurrentVolume = async () => {
      const volume = await VolumeManager.getVolume();
      originalVolumeRef.current = volume.volume;
    };

    fetchCurrentVolume(); 

    const volumeListener = VolumeManager.addVolumeListener((result) => {


        setVolumeWithoutChange(originalVolumeRef.current); 


        if (debounceTimeout) {
          clearTimeout(debounceTimeout);
        }

        debounceTimeout = setTimeout(async () => {
          await handleShutterPress();
        }, 200); 
      

    

    });

    return () => {
      volumeListener.remove(); 
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [ handleShutterPress]); 

  return null; 
};

export default VolumeCapture;
