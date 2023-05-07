import { StyleSheet } from "react-native";

export const global = StyleSheet.create({
  button: {
    backgroundColor: "rgb(45, 164, 78)",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius: 8,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    fontSize: 18,
    marginVertical: 8,
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    padding: 8,
    position: "absolute",
    right: 1,
    backgroundColor: "#fff",
    borderLeftWidth: 1,
  },
  forgotPassword: {
    fontSize: 15,
    alignSelf: "flex-end",
    color: "rgb(88, 166, 255)",
  },
  loginButtonContainer: {
    borderRadius: 5,
    paddingVertical: 8,
    backgroundColor: "#2c974b",
    marginVertical: 16,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  signUp: {
    marginTop: 10,
    fontSize: 15,
    color: "rgb(88, 166, 255)",
  },
});

export const markdownStyles = StyleSheet.create((props) => {
  return {
    textInputStyles: {
      borderWidth: 2,
      padding: 4,
      backgroundColor: props.colors.card,
      borderColor: props.colors.text,
      color: props.colors.text,
      textAlignVertical: "top",
      paddingLeft: 8,
      fontSize: 16,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    buttonContainerStyles: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      borderWidth: 2,
      borderTopWidth: 0,
      backgroundColor: props.colors.card,
      borderColor: props.colors.text,
    },
    markdownContainerStyles: {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderWidth: 2,
      backgroundColor: props.colors.card,
      borderColor: props.colors.text,
    },
    buttonStyles: {
      padding: 8,
      color: props.colors.text,
      borderColor: props.colors.text,
    },
  };
});
