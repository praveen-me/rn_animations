module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@app': './',
        },
      },
    ],
    'react-native-reanimated/plugin',
    'module:react-native-dotenv'
  ],
};
