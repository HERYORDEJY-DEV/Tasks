// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {},
  plugins: [
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          tests: ['./tests/'],
          '@lib': './src/lib',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@theme': './src/theme',
          '@assets': './src/assets',
          '@utils': './src/utils',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@store': './src/store',
          '@v8n': './src/v8n',
          '@services': './src/services',
          '@context': './src/context',
          '@hooks': './src/hooks',
          '@theme': './src/theme',
          '@v8n': './src/v8n',
        },
      },
    ],
    'jest-hoist',
    'react-native-reanimated/plugin',
  ],
};
