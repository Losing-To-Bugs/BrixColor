import * as Speech from 'expo-speech';

const AudioAnnounce = (color: string, brick: string) => {

    const text = `This LEGO is a ${color} ${brick}.`; 
    const speak = async () => {
        try {
          
          const isSpeaking = await Speech.isSpeakingAsync();
          if (!text || isSpeaking) {
            return;  
          }
          Speech.speak(text, {
            language: 'en',
            rate: .8,  
            pitch: 1, 
          });
        } catch (error) {
          console.error('Error while trying to speak:', error);
        }
      };

  return { speak };
};

export default AudioAnnounce;