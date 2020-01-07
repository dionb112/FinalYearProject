module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

// babel config before using Expo: 
//
// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };
