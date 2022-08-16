import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  Pressable,
  Switch,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { signUpNewUser, userLogout, updateUserInfo } from "../firebase/config";
import { convertLocationToLatLong } from "../utils/api";
import { getInitials } from "../firebase/functions";

export default function SignUpScreen({ navigation }) {
  const [canDrive, setCanDrive] = useState(false);
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [bio, setBio] = useState(null);
  const [location, setLocation] = useState(null);
  const [email, setEmail] = useState(null);
  const [show, setShow] = useState(false);

  const [error, setError] = useState(false);

  const lastNameRef = useRef();
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const bioRef = useRef();
  const postcodeRef = useRef();

  function handleSignUpPress() {
    if (!fname || !lname || !username || !password || !location || !email) {
      setShow(true);
    } else if (error) {
      setShow(true);
    } else {
      // const latLong = convertLocationToLatLong(location);
      const avatar = getInitials(fname, lname);
      const userDetails = {
        avatar,
        fname,
        lname,
        username,
        bio,
        location,
        canDrive,
        email,
      };

      userLogout();
      signUpNewUser(email, password)
        .then(({ id }) => {
          return id;
        })
        .then((id) => {
          updateUserInfo(id, userDetails);
        })
        .then(() => {
          navigation.navigate("Splash");
        })
        .catch((err) => {
          console.log(err.code);
          if (err.code === "auth/invalid-email") {
            setError("Invalid email format");
          }
          if (err.code === "auth/weak-password") {
            setError(
              "Weak password. Password must be at least 6 characters long"
            );
          }
          if (err.code === "auth/email-already-in-use") {
            setError("Email already exists. Please log in");
          }
        });
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={75}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require("../assets/chip-in-logo-large.png")}
          />
          <Text style={styles.subtitle}>
            Tell us a little about yourself...
          </Text>
          <Text style={styles.requiredText}>* required fields</Text>
          <TextInput
            style={styles.textField}
            onChangeText={setFname}
            value={fname}
            placeholder="* First name"
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.textField}
            onChangeText={setLname}
            value={lname}
            placeholder="* Last name"
            ref={lastNameRef}
            returnKeyType="next"
            onSubmitEditing={() => userNameRef.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.textField}
            onChangeText={setUsername}
            value={username}
            placeholder="* Username (What others will see)"
            ref={userNameRef}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.textField}
            onChangeText={setEmail}
            value={email}
            placeholder="* Email"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.textField}
            onChangeText={setPassword}
            secureTextEntry={true}
            value={password}
            placeholder="* Password (Must be at least 6 characters)"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => bioRef.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            multiline={true}
            style={styles.bio}
            onChangeText={setBio}
            value={bio}
            placeholder="A brief description of your skills and abilities..."
            ref={bioRef}
            onSubmitEditing={() => postcodeRef.current.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.textField}
            onChangeText={setLocation}
            value={location}
            placeholder="* Your postcode"
            ref={postcodeRef}
            returnKeyType="done"
          />
          <View style={styles.doYouDrive}>
            <Text style={{ fontSize: 15 }}>Do you drive?</Text>
            <Switch
              value={canDrive}
              onValueChange={() => {
                setCanDrive(!canDrive);
              }}
            />
          </View>
          {show ? (
            <View>
              <Text style={{ color: "red" }}>
                Missing information, please check and try again
              </Text>
            </View>
          ) : (
            <></>
          )}
          {error ? (
            <View>
              <Text style={{ color: "red" }}>{error}</Text>
            </View>
          ) : (
            <></>
          )}
          <Pressable
            android_ripple={{ color: "white", borderless: false }}
            style={styles.signUpButton}
            onPress={handleSignUpPress}
          >
            <Text style={{ textAlign: "center", fontSize: 16 }}>Sign Up!</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    borderWidth: 0.7,
    borderRadius: 5,
    width: 300,
    height: 35,
    margin: 8,
    textAlign: "left",
    padding: 5,
    fontSize: 15,
  },
  bio: {
    borderWidth: 0.7,
    borderRadius: 5,
    width: 300,
    height: 80,
    margin: 8,
    textAlign: "left",
    textAlignVertical: "top",
    flexWrap: "wrap",
    padding: 5,
    fontSize: 15,
  },
  logo: {
    resizeMode: "cover",
    height: 200,
    width: 200,
    margin: 5,
  },
  signUpButton: {
    backgroundColor: "#47c9af",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    margin: 20,
    padding: 10,
  },
  subtitle: {
    fontSize: 16,
    right: 47,
    margin: 5,
  },
  doYouDrive: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    right: 80,
  },
  requiredText: {
    margin: 5,
    marginBottom: 0,
    right: 110,
    fontSize: 12,
    color: "red",
  },
});
