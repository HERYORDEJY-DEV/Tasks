import { Platform } from 'react-native';

export const fontFamily:
  | { Regular: string; Bold: string; RegularItalic: string; BoldItalic: string }
  | undefined = Platform.select({
  android: {
    Regular: 'Product Sans Regular',
    Bold: 'Product Sans Bold',
    RegularItalic: 'Product Sans Italic',
    BoldItalic: 'Product Sans Bold Italic',
  },
  ios: {
    Regular: 'Product Sans',
    Bold: 'Product Sans Bold',
    RegularItalic: 'Product Sans Italic',
    BoldItalic: 'Product Sans Bold Italic',
  },
});

export const fontConfig = {
  Product: {
    400: {
      normal: fontFamily?.Regular,
    },

    700: {
      normal: fontFamily?.Bold,
      italic: fontFamily?.BoldItalic,
    },
  },
};

export const fonts = {
  product: 'Product',
};
