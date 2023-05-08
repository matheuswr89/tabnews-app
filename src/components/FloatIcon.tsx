import { StyleSheet, TouchableOpacity } from "react-native";
import { FloatIconInterface } from "../models/ComponentsModel";

import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";

export default function FloatIcon({
  name,
  color,
  onPress,
}: FloatIconInterface) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      onPress={onPress}
    >
      <IconMaterialCommunity name={name} size={30} color="#e4e3e3" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
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
