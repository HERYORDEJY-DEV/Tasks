import { extendTheme } from 'native-base';
import { fontConfig, fonts } from 'theme/font';
import { colors } from './colors';
import { TextTheme } from './text';

export const theme = extendTheme({
  colors,
  fonts,
  fontConfig,
  components: {
    Text: TextTheme,
  },
});

type CustomThemeType = typeof theme;

// 3. Extend the internal NativeBase Theme
declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
