import { useTheme } from "@react-navigation/native";
import { useContext, useState } from "react";
import { NavigationPage } from "../models/PagesModels";
import { global } from "../util/global";
import { mailFormatValidator } from "../util/util";

import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AuthContext from "../context/AuthContext";

export const Login = ({ navigation }: NavigationPage) => {
  const { colors } = useTheme();
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignIn = () => {
    Keyboard.dismiss();
    setIsLoading(true);

    if (!email.match(mailFormatValidator)) {
      Alert.alert("Por favor, preencha todos os campos corretamente!");
      setIsLoading(false);
      return;
    }

    signIn(email, password).then((value) => {
      if (!value) {
        Alert.alert("Dados de login incorretos!");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      navigation.goBack();
    });
  };

  const handleSignUp = async () => {
    navigation.navigate("CreateAccount");
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);

    const url = "https://www.tabnews.com.br/cadastro/recuperar";
    const canOpen = Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }

    setIsLoading(false);
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
      <Text style={[global.title, { color: colors.text }]}>Login</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder={"Email"}
        style={[global.input]}
        keyboardType={"email-address"}
        autoComplete={"email"}
        autoCapitalize="none"
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
      <TouchableWithoutFeedback onPress={handleForgotPassword}>
        <Text style={global.forgotPassword}>Esqueci minha senha</Text>
      </TouchableWithoutFeedback>

      <TouchableOpacity
        onPress={handleSignIn}
        style={[global.loginButtonContainer, { width: "100%" }]}
      >
        {!isLoading && <Text style={global.loginButton}>Login</Text>}
        {isLoading && <ActivityIndicator size="large" />}
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={handleSignUp}>
        <Text style={global.signUp}>Novo no TabNews? Crie sua conta aqui.</Text>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
