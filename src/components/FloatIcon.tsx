import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";

export default function FloatIcon() {
  const { navigate }: any = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigate("CreatePost", { mode: "creation" })}
    >
      <IconMaterialCommunity
        name="text-box-plus-outline"
        size={30}
        color="#e4e3e3"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3e82d1",
    position: "absolute",
    width: 60,
    height: 60,
    padding: 6,
    zIndex: 30,
    bottom: 70,
    right: 0,
    margin: 10,
    borderRadius: 9,
  },
  commentContainer: {
    marginBottom: 16,
    padding: 8,
    borderRadius: 5,
  },
});
