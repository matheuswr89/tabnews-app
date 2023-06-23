import { useNavigation, useTheme } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Alert, DeviceEventEmitter, StyleSheet, Text } from "react-native";
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu";
import { useTheme as personalTheme } from "../hooks/useTheme";
import { HeaderIconsInterface } from "../models/ComponentsModel";

import Icon from "react-native-vector-icons/FontAwesome5";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import AuthContext from "../context/AuthContext";

export default function HeaderIcons({ show }: HeaderIconsInterface) {
  const { colors } = useTheme();
  const { navigate }: any = useNavigation();
  const [mode, setMode] = useState(true);
  const { isLogged, signOut } = useContext(AuthContext);
  const { getTheme, saveTheme } = personalTheme();

  const signOutConfirm = () => {
    Alert.alert("Deseja realmente sair?", "", [
      {
        text: "Sim",
        onPress: () => {
          signOut();
          navigate("Home");
        },
      },
      { text: "Não" },
    ]);
  };

  useEffect(() => {
    changeTheme();
  }, []);

  async function changeTheme() {
    const theme = await getTheme();
    if (theme !== undefined) {
      setMode(!theme);
    }
  }

  const navigateTo = () => {
    if (!isLogged) navigate("Login");
    else navigate("Perfil");
  };
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  return (
    !show && (
      <Menu
        style={{ backgroundColor: colors.card }}
        visible={visible}
        anchor={
          <Icon
            name="bars"
            size={30}
            color={colors.text}
            onPress={showMenu}
            style={{ width: 35 }}
          />
        }
        onRequestClose={hideMenu}
      >
        <MenuItem
          onPress={() => {
            hideMenu();
            navigateTo();
          }}
        >
          <Text style={{ color: colors.text, fontSize: 19, lineHeight: 22 }}>
            <Icon
              name="user"
              color={colors.text}
              solid={true}
              style={styles.icon}
            />
            {"  "}
            Perfil
          </Text>
        </MenuItem>
        <MenuItem
          onPress={() => {
            hideMenu();
            setMode((value) => !value);
            saveTheme(mode);
            DeviceEventEmitter.emit("changeTheme", mode);
          }}
        >
          <Text style={{ color: colors.text, fontSize: 19, lineHeight: 22 }}>
            <Icon
              name={!mode ? "sun" : "moon"}
              color={colors.text}
              solid={true}
              style={styles.icon}
            />
            {!mode ? "  Light" : "  Dark"}
          </Text>
        </MenuItem>
        {isLogged && (
          <>
            <MenuDivider color={colors.text} />
            <MenuItem
              onPress={() => {
                hideMenu();
                signOutConfirm();
              }}
            >
              <Text
                style={{
                  color: "rgb(248, 81, 73)",
                  fontSize: 19,
                  lineHeight: 22,
                }}
              >
                <IconMaterial
                  name="logout"
                  color="rgb(248, 81, 73)"
                  style={styles.icon}
                />
                {"  Logout"}
              </Text>
            </MenuItem>
          </>
        )}
      </Menu>
    )
  );
}

const styles = StyleSheet.create({
  viewIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 19,
  },
});
