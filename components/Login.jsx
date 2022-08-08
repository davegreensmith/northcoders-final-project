import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  Pressable,
} from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/chip-in-logo-1.png")}
      />
      <TextInput style={styles.textField} placeholder="Email" />
      <TextInput
        style={styles.textField}
        secureTextEntry={true}
        placeholder="Password"
      />
      <Pressable style={styles.loginButton}>
        <Text style={{ textAlign: "center", fontSize: 16 }}>Login</Text>
      </Pressable>
      <View style={styles.divideLine}></View>
      <View style={styles.viewRow}>
        <Text style={styles.signupText}>New to ChipIn?</Text>
        <Pressable style={styles.sigupButton}>
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
    borderColor: "#000",
    borderWidth: 1,
    width: 300,
    height: 50,
    margin: 8,
    textAlign: "center",
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: "#47c9af",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    width: 90,
    margin: 20,
    padding: 10,
  },
  divideLine: {
    width: 350,
    borderColor: "#000",
    borderWidth: 1,
    margin: 10,
  },
  viewRow: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  signupText: {
    fontSize: 20,
    marginRight: 10,
  },
  sigupButton: {
    backgroundColor: "#47c9af",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    width: 90,
    margin: 10,
    padding: 10,
  },
});