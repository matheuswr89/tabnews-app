import { ActivityIndicator, Dimensions, View } from "react-native";
export default function Loading() {
  return (
    <View
      style={{
        height: 100,
        width: Dimensions.get("screen").width,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
