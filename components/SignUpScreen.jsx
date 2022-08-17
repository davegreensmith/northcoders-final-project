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

  const [signupPressed, setSignupPressed] = useState(false);

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
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraScrollHeight={75}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.pageContent}
    >
      <View style={styles.section}>
        <Image
          style={styles.logo}
          source={require("../assets/chip-in-logo-large.png")}
        />
      </View>
      <View style={styles.subtitleFlexBox}>
        <Text style={styles.subtitle}>Tell us a little about yourself...</Text>
        <Text style={styles.requiredText}>* required fields</Text>
      </View>
      <View style={styles.section}>
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
          placeholder="* Password (Minimum 6 characters)"
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
          placeholder="* Your bio, this should tell others all about you and your skills..."
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
      </View>
      {show ? (
        <View style={styles.section}>
          <Text style={{ color: "red" }}>
            Missing information, please check and try again
          </Text>
        </View>
      ) : (
        <View style={styles.section} />
      )}
      {error ? (
        <View>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      ) : (
        <></>
      )}
      <View style={styles.section}>
        <Pressable
          style={
            signupPressed ? styles.signupButtonPressed : styles.signUpButton
          }
          onPress={handleSignUpPress}
          onPressIn={() => setSignupPressed(true)}
          onPressOut={() => setSignupPressed(false)}
        >
          <Text style={{ textAlign: "center", fontSize: 16 }}>Sign Up!</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  section: {
    alignItems: "center",
    flexGrow: 1,
  },
  subtitleFlexBox: {
    alignItems: "flex-start",
    width: 300,
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
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    padding: 10,
    marginBottom: 10,
  },
  signupButtonPressed: {
    backgroundColor: "#357568",
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    padding: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    margin: 5,
  },
  doYouDrive: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  requiredText: {
    margin: 5,
    fontSize: 12,
    color: "red",
  },
});
