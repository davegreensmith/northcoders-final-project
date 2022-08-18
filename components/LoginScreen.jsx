import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { sendResetPasswordEmail, userLogin } from "../firebase/config";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [loginPressed, setLoginPressed] = useState(false);
  const [signupPressed, setSignupPressed] = useState(false);

  function handleEmailResetLink() {
    sendResetPasswordEmail(email);
    setError("Please check your email for link to reset password");
  }

  function handleLoginPress() {
    return userLogin(email, password)
      .then(() => {
        navigation.navigate("Splash");
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/invalid-email") {
          setError("Email not found");
        }
        if (err.code === "auth/wrong-password") {
          setError("Wrong password");
        }
        if (err.code === "auth/user-not-found") {
          setError("No user found, please sign up!");
        }
      });
  }

  function handleSignUpPress() {
    navigation.navigate("Sign Up");
  }

  useEffect(() => {
    setPassword("");
  }, []);

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.pageContent}
      enableOnAndroid={true}
    >
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
          {error === "Wrong password" ? (
            <Pressable
              android_ripple={{ color: "white" }}
              onPress={handleEmailResetLink}
            >
              <Text>Send password Reset Link</Text>
            </Pressable>
          ) : (
            <></>
          )}
        </View>
      ) : (
        <></>
      )}
      <Pressable
        style={loginPressed ? styles.loginButtonPressed : styles.loginButton}
        onPress={handleLoginPress}
        onPressIn={() => setLoginPressed(true)}
        onPressOut={() => setLoginPressed(false)}
      >
        <Text style={{ textAlign: "center", fontSize: 16 }}>Login</Text>
      </Pressable>
      <View style={styles.divideLine}></View>
      <View style={styles.viewRow}>
        <Text style={styles.signupText}>New to ChipIn?</Text>
        <Pressable
          style={signupPressed ? styles.sigupButtonPressed : styles.sigupButton}
          onPress={handleSignUpPress}
          onPressIn={() => setSignupPressed(true)}
          onPressOut={() => setSignupPressed(false)}
        >
          <Text style={{ textAlign: "center", fontSize: 16 }}>Sign Up</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
  loginButtonPressed: {
    backgroundColor: "#357568",
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
  sigupButtonPressed: {
    backgroundColor: "#357568",
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    margin: 10,
    padding: 10,
  },
});
