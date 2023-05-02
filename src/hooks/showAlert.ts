import { Alert } from "react-native";

interface ShowAlertInterface {
  title: string;
  message?: string;
  onPressYes?: any;
  onPressNo?: any;
}

export const showAlert = ({
  title,
  message,
  onPressYes,
  onPressNo,
}: ShowAlertInterface) => {
  const isOnPressYes = onPressYes ? { onPress: onPressYes } : "";
  const isOnPressNo = onPressNo ? { onPress: onPressNo } : "";
  Alert.alert(title, message || "", [
    {
      text: "Sim",
      ...isOnPressYes,
    },
    {
      text: "Não",
      ...isOnPressNo,
    },
  ]);
};
