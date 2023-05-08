import { useTheme } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationPage } from "../models/PagesModels";
import { global } from "../util/global";
import { mailFormatValidator } from "../util/util";

import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AuthContext from "../context/AuthContext";

export const CreateAccount = ({ navigation }: NavigationPage) => {
  const { colors } = useTheme();
  const { signUp } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignUp = async () => {
    Keyboard.dismiss();
    if (!email.match(mailFormatValidator)) {
      Alert.alert("Por favor, preencha todos os campos corretamente!");
      return;
    }

    if (!username.length) {
      Alert.alert("O nome de usuário é obrigatório!");
      return;
    }

    if (!password.length) {
      Alert.alert("A senha é obrigatória!");
      return;
    }

    setIsLoading(true);
    signUp(username, email, password)
      .then(() => {
        setIsLoading(false);
        Alert.alert(
          "Cadastro realizado com sucesso!",
          "Agora você receberá um link por email para confirmar o seu cadastro e ativar a conta."
        );
        navigation.navigate("LoginPage");
      })
      .catch(() => {
        alert("Verifique os dados informados e tente novamente");
        setIsLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
      onStartShouldSetResponder={(): any => Keyboard.dismiss()}
    >
      <Text style={[global.title, { color: colors.text }]}>Cadastro</Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder={"Nome de usuário"}
        style={[global.input]}
        autoComplete={"username"}
        secureTextEntry={false}
        onSubmitEditing={Keyboard.dismiss}
        placeholderTextColor="#000"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder={"Email"}
        style={[global.input]}
        keyboardType={"email-address"}
        autoComplete={"email"}
        secureTextEntry={false}
        onSubmitEditing={Keyboard.dismiss}
        placeholderTextColor="#000"
      />
      <View style={global.passwordContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder={"Senha"}
          autoCapitalize="none"
          style={[global.input]}
          secureTextEntry={!showPassword}
          onSubmitEditing={Keyboard.dismiss}
          placeholderTextColor="#000"
        />
        <IconMaterialCommunityIcons
          name={showPassword ? "eye-off" : "eye"}
          size={20}
          onPress={() => setShowPassword(!showPassword)}
          style={global.searchIcon}
        />
      </View>

      <TouchableOpacity
        onPress={handleSignUp}
        style={[global.loginButtonContainer, { width: "100%" }]}
      >
        {!isLoading && <Text style={global.loginButton}>Criar cadastro</Text>}
        {isLoading && <ActivityIndicator size="large" />}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
