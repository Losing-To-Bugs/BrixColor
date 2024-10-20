import * as Speech from 'expo-speech';
//import TTS from 'react-native-tts' for no expo-speech
const AudioAnnounce = (colorHex: string, size: string) => {

    //const colorName = getClosestColor(colorHex);  // Convert hex to a human-readable color name if we need this
    const text = `This LEGO brick is ${size} and its color is ${colorHex}.`; 
    const speak = async () => {
        try {
          
          const isSpeaking = await Speech.isSpeakingAsync();
          if (!text || isSpeaking) {
            return;  
          }
          //TTS.speak
          Speech.speak(text, {
            language: 'en',
            rate: 1,  
            pitch: 1, 
          });
        } catch (error) {
          console.error('Error while trying to speak:', error);
        }
      };

  return { speak };
};

export default AudioAnnounce;