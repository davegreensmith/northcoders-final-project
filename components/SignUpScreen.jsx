import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  Pressable,
} from "react-native";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/chip-in-logo-1.png")}
      />
      <Text style={styles.subtitle}>Tell us a little about youself...</Text>
      <TextInput style={styles.textField} placeholder="First name" />
      <TextInput style={styles.textField} placeholder="Last name" />
      <TextInput
        style={styles.textField}
        placeholder="Username (what others will see)"
      />
      <TextInput
        style={styles.textField}
        placeholder="Password (Must be at least 8 characters)"
      />
      <TextInput
        style={styles.textField}
        placeholder="A brief description of your skills and abilities..."
      />
      <TextInput style={styles.textField} placeholder="Your postcode" />
      <Pressable style={styles.loginButton}>
        <Text style={{ textAlign: "center", fontSize: 16 }}>Sign Up!</Text>
      </Pressable>
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
  textField: {
    borderColor: "#000",
    borderWidth: 1,
    width: 300,
    height: 50,
    margin: 8,
    textAlign: "center",
    fontSize: 15,
  },
  logo: {
    resizeMode: "cover",
    height: 200,
    width: 200,
    margin: 10,
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
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  }
});
