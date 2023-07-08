import { useTheme } from "@react-navigation/native";
import { useMemo } from "react";
import { Text } from "react-native";

export default function ReadTime({ text }) {
  const { colors } = useTheme();

  const readTimeInMinutes = useMemo(() => {
    const wpm = 260;
    const wordsQuantity = text.split(/[^A-Za-z]+/).length;
    return `${Math.ceil(wordsQuantity / wpm)} min de leitura`;
  }, [text]);

  return (
    <Text style={{ color: colors.text }}>
      <Text style={{ fontWeight: "900" }}>{" · "}</Text>
      {readTimeInMinutes}
    </Text>
  );
}
