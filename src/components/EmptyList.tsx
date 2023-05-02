import { useTheme } from "@react-navigation/native";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Foundation";

export default function EmptyList() {
  const { colors } = useTheme();
  return (
    <View style={{ alignItems: "center" }}>
      <Icon name="trees" size={30} color={colors.text} />
      <Text style={{ color: colors.text, fontSize: 20 }}>
        Nenhum conteúdo encontrado!
      </Text>
      <Text style={{ color: colors.text, fontSize: 20 }}>
        Quando eu cheguei era tudo mato...
      </Text>
    </View>
  );
}
