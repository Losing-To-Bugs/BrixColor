import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Settings from '@/app/(drawer)/scan/settings';
import { useSettings } from '@/components/SettingsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
  }));

jest.mock('@/components/SettingsContext', () => ({
      useSettings: jest.fn(),
    }));
    
    describe('Settings', () => {
        const mockSetToggleScans = jest.fn();
        const mockSetToggleAudio = jest.fn();
        const mockSetToggleCapture = jest.fn();
        const mockSetTheme = jest.fn();
        test('renders', () => {
            const { getByText } = render(<Settings />);
            expect(getByText('Settings')).toBeTruthy();
            expect(getByText('Back')).toBeTruthy();
            expect(getByText('General Settings')).toBeTruthy();
            expect(getByText('Select Language:')).toBeTruthy();
            expect(getByText('Save Scans to Phone')).toBeTruthy();
            expect(getByText('Accessibility Settings')).toBeTruthy();
            expect(getByText('Audio Narration')).toBeTruthy();
            expect(getByText('Select UI Theme:')).toBeTruthy();
            expect(getByText('Select Text Font Size:')).toBeTruthy();
            expect(getByText('Select Icon Size:')).toBeTruthy();
          });
        
        beforeEach(() => {
          (useSettings as jest.Mock).mockReturnValue({
            toggleScans: false,
            toggleAudio: false,
            toggleCapture: false,
            setTogglescans: mockSetToggleScans,
            setToggleAudio: mockSetToggleAudio,
            setToggleCapture: mockSetToggleCapture,
            setTheme: mockSetTheme,
            theme: 'Light',
            fontSize: 'Medium',
            iconSize: 'Medium',
            themes: {
              Light: {
                switchOffColor: '#E0E0E0',
                primaryColor: '#0055BF',
              },
            },
            fontSizes: {
              Small: { fontSize: 14 },
              Medium: { fontSize: 16 },
              Big: { fontSize: 18 },
              Huge: { fontSize: 20 },
            },
            iconSizes: {
              Small: { Size: 24 },
              Medium: { Size: 32 },
              Big: { Size: 40 },
              Huge: { Size: 48 },
            }, 
          });
        });
      
        afterEach(() => {
          jest.clearAllMocks(); 
        });
      
        it('should toggle the Scans switch and save settings', async () => {
          const { getByLabelText } = render(<Settings />); 
      
          const switchComponent = getByLabelText('Save Scans to Phone');
      
          expect(switchComponent.props.value).toBe(false);
      
          fireEvent(switchComponent, 'valueChange', true);
          
          expect(mockSetToggleScans).toHaveBeenCalledWith(true);
          expect(AsyncStorage.setItem).toHaveBeenCalledWith("toggleScans", JSON.stringify(true));
        });
      
        it('should toggle the switch off for Scans', async () => {
          (useSettings as jest.Mock).mockReturnValueOnce({
            toggleScans: true,
            setTogglescans: mockSetToggleScans,
            theme: 'Light',
            fontSize: 'Medium',
            iconSize: 'Medium',
            themes: {
              Light: {
                switchOffColor: '#E0E0E0',
                primaryColor: '#0055BF',
              },
              Dark: {
                switchOffColor: '#E0E0E0',
                primaryColor: '#1F449C',
              }
            },
            fontSizes: {
              Small: { fontSize: 14 },
              Medium: { fontSize: 16 },
              Big: { fontSize: 18 },
              Huge: { fontSize: 20 },
            },
            iconSizes: {
              Small: { Size: 24 },
              Medium: { Size: 32 },
              Big: { Size: 40 },
              Huge: { Size: 48 },
            },
          });
      
          const { getByLabelText } = render(<Settings />); 
      
          const switchComponent = getByLabelText('Save Scans to Phone');
      
          expect(switchComponent.props.value).toBe(true);
      
          fireEvent(switchComponent, 'valueChange', false);
          
          expect(mockSetToggleScans).toHaveBeenCalledWith(false);
          expect(AsyncStorage.setItem).toHaveBeenCalledWith("toggleScans", JSON.stringify(false));
        });
        it('should toggle the Audio switch and save settings', async () => {
          const { getByLabelText } = render(<Settings />); 
      
          const switchComponent = getByLabelText('App Audio Narration');
      
          expect(switchComponent.props.value).toBe(false);
      
          fireEvent(switchComponent, 'valueChange', true);
          
          expect(mockSetToggleAudio).toHaveBeenCalledWith(true);
          expect(AsyncStorage.setItem).toHaveBeenCalledWith("toggleAudio", JSON.stringify(true));
        });
      
        it('should toggle the switch off for Audio', async () => {
          (useSettings as jest.Mock).mockReturnValueOnce({
            toggleAudio: true,
            setToggleAudio: mockSetToggleAudio,
            theme: 'Light',
            fontSize: 'Medium',
            iconSize: 'Medium',
            themes: {
              Light: {
                switchOffColor: '#E0E0E0',
                primaryColor: '#0055BF',
              },
            },
            fontSizes: {
              Small: { fontSize: 14 },
              Medium: { fontSize: 16 },
              Big: { fontSize: 18 },
              Huge: { fontSize: 20 },
            },
            iconSizes: {
              Small: { Size: 24 },
              Medium: { Size: 32 },
              Big: { Size: 40 },
              Huge: { Size: 48 },
            },
          });
      
          const { getByLabelText } = render(<Settings />); 
      
          const switchComponent = getByLabelText('App Audio Narration');
      
          expect(switchComponent.props.value).toBe(true);
      
          fireEvent(switchComponent, 'valueChange', false);
          
          expect(mockSetToggleAudio).toHaveBeenCalledWith(false);
          expect(AsyncStorage.setItem).toHaveBeenCalledWith("toggleAudio", JSON.stringify(false));
        });
        it('should toggle the Capture switch and save settings', async () => {
          const { getByLabelText } = render(<Settings />); 
      
          const switchComponent = getByLabelText('Scan with volume buttons');
      
          expect(switchComponent.props.value).toBe(false);
      
          fireEvent(switchComponent, 'valueChange', true);
          
          expect(mockSetToggleCapture).toHaveBeenCalledWith(true);
          expect(AsyncStorage.setItem).toHaveBeenCalledWith("toggleCapture", JSON.stringify(true));
        });
      
        it('should toggle the switch off for Capture', async () => {
          (useSettings as jest.Mock).mockReturnValueOnce({
            toggleCapture: true,
            setToggleCapture: mockSetToggleCapture,
            theme: 'Light',
            fontSize: 'Medium',
            iconSize: 'Medium',
            themes: {
              Light: {
                switchOffColor: '#E0E0E0',
                primaryColor: '#0055BF',
              },
            },
            fontSizes: {
              Small: { fontSize: 14 },
              Medium: { fontSize: 16 },
              Big: { fontSize: 18 },
              Huge: { fontSize: 20 },
            },
            iconSizes: {
              Small: { Size: 24 },
              Medium: { Size: 32 },
              Big: { Size: 40 },
              Huge: { Size: 48 },
            },
          });
      
          const { getByLabelText } = render(<Settings />); 
      
          const switchComponent = getByLabelText('Scan with volume buttons');
      
          expect(switchComponent.props.value).toBe(true);
      
          fireEvent(switchComponent, 'valueChange', false);
          
          expect(mockSetToggleCapture).toHaveBeenCalledWith(false);
          expect(AsyncStorage.setItem).toHaveBeenCalledWith("toggleCapture", JSON.stringify(false));
        });
      });