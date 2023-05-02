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
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AuthContext from "../context/AuthContext";
import { global } from "../util/global";

const mailFormatValidator = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const CreateAccount = ({ navigation }: any) => {
  const { colors } = useTheme();
  const { signUp } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        style={global.loginButtonContainer}
      >
        {!isLoading && <Text style={global.loginButton}>Criar cadastro</Text>}
        {isLoading && <ActivityIndicator size="large" />}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
