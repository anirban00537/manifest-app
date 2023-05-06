module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@realm/babel-plugin',
    ['@babel/plugin-proposal-decorators', {legacy: true}],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
