const LIGHT_SPLASH = {
  image: "./assets/splash.png",
  backgroundColor: "#FFFFFF",
  resizeMode: "contain",
};

const DARK_SPLASH = {
  image: "./assets/splash.png",
  backgroundColor: "#000000",
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
  version: "1.0.2",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "automatic",
  splash: LIGHT_SPLASH,
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    ...SHARED_SPLASH,
    supportsTablet: true,
    bundleIdentifier: "com.tabnews",
    buildNumber: "1.0.2",
  },
  android: {
    ...SHARED_SPLASH,
    package: "com.tabnews",
    versionCode: 2,
  },
  web: {
    icon: "./assets/icon.png",
    ...SHARED_SPLASH,
  },
};

export default config;
