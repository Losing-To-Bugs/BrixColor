import { useEffect, useState, useRef } from "react";
import { VolumeManager } from "react-native-volume-manager";

interface VolumeCaptureProps {
  handleShutterPress: () => Promise<void>;
}

const VolumeCapture: React.FC<VolumeCaptureProps> = ({
  handleShutterPress,
}) => {

  const [changingVolume, setChangingVolume] = useState(false)
  const originalVolumeRef = useRef<number>(0);
  const changingVolumeRef = useRef<boolean>(false);
  let debounceTimeout: NodeJS.Timeout | undefined;

  const setVolumeWithoutChange = async (volume: number) => {
    await VolumeManager.setVolume(volume); 
  };

  useEffect(() => {
    VolumeManager.getVolume().then(volume => {
      originalVolumeRef.current = volume.volume;
    })
  })

  useEffect(() => {
    const volumeListener = VolumeManager.addVolumeListener(async (result) => {
      if (changingVolumeRef.current) {
        return
      }
        changingVolumeRef.current = true
        await setVolumeWithoutChange(originalVolumeRef.current).then(() =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 500);
            }))

        await handleShutterPress()

        changingVolumeRef.current = false
    });

    return () => {
      volumeListener.remove()
    }
  }, [changingVolume]);

  return null; 
};

export default VolumeCapture;
