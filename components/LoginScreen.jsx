import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  Pressable,
} from "react-native";
import { useState } from "react";
import { userLogin } from "../firebase/config";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleLoginPress() {
    return userLogin(email, password)
      .then(() => {
        navigation.navigate("Splash");
      })
      .catch((err) => {
        if (err.code === "auth/invalid-email") {
          setError("Email not found");
        }
        if (err.code === "auth/wrong-password") {
          setError("Wrong password");
        }
      });
  }

  function handleSignUpPress() {
    navigation.navigate("Sign Up");
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/chip-in-logo-large.png")}
      />
      <TextInput
        style={styles.textField}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.textField}
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
      />

      {error ? (
        <View>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      ) : (
        <></>
      )}
      <Pressable style={styles.loginButton} onPress={handleLoginPress}>
        <Text style={{ textAlign: "center", fontSize: 16 }}>Login</Text>
      </Pressable>
      <View style={styles.divideLine}></View>
      <View style={styles.viewRow}>
        <Text style={styles.signupText}>New to ChipIn?</Text>
        <Pressable style={styles.sigupButton} onPress={handleSignUpPress}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    resizeMode: "cover",
    height: 200,
    width: 200,
    margin: 10,
  },
  textField: {
    borderWidth: 0.5,
    borderRadius: 5,
    width: 300,
    height: 50,
    margin: 8,
    textAlign: "center",
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: "#47c9af",
    borderWidth: 1,
    borderRadius: 5,
    width: 90,
    margin: 20,
    padding: 10,
  },
  divideLine: {
    width: 350,
    borderWidth: 1,
    margin: 10,
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  signupText: {
    fontSize: 18,
    marginRight: 10,
  },
  sigupButton: {
    backgroundColor: "#47c9af",
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    margin: 10,
    padding: 10,
  },
});
