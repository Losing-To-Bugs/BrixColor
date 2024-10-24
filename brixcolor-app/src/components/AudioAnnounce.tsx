import * as Speech from 'expo-speech';

const AudioAnnounce = (color: string, size: string) => {

    const text = `This LEGO brick is ${size} and its color is ${color}.`; 
    const speak = async () => {
        try {
          
          const isSpeaking = await Speech.isSpeakingAsync();
          if (!text || isSpeaking) {
            return;  
          }
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