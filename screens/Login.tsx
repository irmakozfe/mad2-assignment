import { useState } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Log in</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      <Button
        mode="contained"
        buttonColor="#B6CFE4"
        textColor="#422D28"
        style={styles.button}
        onPress={() => {}}
      >
        Log in
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#422D28",
    justifyContent: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 150,
  },
  header: {
    color: "#F0E7D5",
    fontSize: 32,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 24,
  },
  input: { marginBottom: 16 },
  button: { marginTop: 8, borderRadius: 100 },
});
