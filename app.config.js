const LIGHT_SPLASH = {
  image: "./assets/splash.png",
  backgroundColor: "#F2F2F2",
  resizeMode: "contain",
};

const DARK_SPLASH = {
  image: "./assets/splash-dark.png",
  backgroundColor: "#0D1117",
  resizeMode: "contain",
};

const SHARED_SPLASH = {
  splash: {
    ...LIGHT_SPLASH,
    dark: {
      ...DARK_SPLASH,
    },
  },
};

const config = {
  name: "TabNews",
  slug: "tabnews",
  version: "1.1.0",
  scheme: "tabnews",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: LIGHT_SPLASH,
  userInterfaceStyle: "automatic",
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    ...SHARED_SPLASH,
    supportsTablet: true,
    bundleIdentifier: "com.tabnews",
    buildNumber: "1.1.0",
  },
  android: {
    ...SHARED_SPLASH,
    package: "com.tabnews",
    versionCode: 10,
  },
  web: {
    icon: "./assets/icon.png",
    ...SHARED_SPLASH,
  },
  packagerOpts: {
    config: "metro.config.js",
    sourceExts: [
      "expo.ts",
      "expo.tsx",
      "expo.js",
      "expo.jsx",
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "wasm",
      "svg",
    ],
  },
};

export default config;
