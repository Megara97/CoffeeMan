import {useColorScheme} from 'react-native';
import Theme from '../assets/theme';

export function useThemeColors() {
   const theme = useColorScheme();
   const colors = theme === 'dark' ? Theme.dark.colors : Theme.light.colors;
   return colors;
}
