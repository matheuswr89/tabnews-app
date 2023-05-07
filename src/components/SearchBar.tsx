import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";

const SwitchComponent = ({
  searchFunc,
  setLoadingContent,
  setValue,
  setNextPageLink,
}: any) => {
  const [search, setSearch] = useState("");
  const updateSearch = (search: string) => {
    setSearch(search);
  };

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setValue([]);
      setNextPageLink("");
      searchFunc(search, setLoadingContent, setValue, setNextPageLink);
      setSearch("");
    });

    return () => {
      hideSubscription.remove();
    };
  }, [search]);

  return (
    <View style={styles.view}>
      <TextInput
        style={{
          backgroundColor: "#fff",
          margin: 10,
          height: 40,
          fontSize: 20,
          padding: 5,
          borderRadius: 8,
          color: "#000",
        }}
        placeholderTextColor="#000"
        placeholder="Type Here..."
        onChangeText={updateSearch}
        keyboardType="web-search"
        value={search}
        onSubmitEditing={Keyboard.dismiss}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    marginBottom: 5,
    width: "100%",
  },
});

export default SwitchComponent;
