const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Resolve expo-sqlite differently for web
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'wasm');

module.exports = config;