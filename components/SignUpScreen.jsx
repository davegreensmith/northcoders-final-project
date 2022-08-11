import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  Pressable,
  Switch,
} from "react-native";
import { useState } from "react";
import { signUpNewUser, userLogout, updateUserInfo } from "../firebase/config";

export default function SignUpScreen({ navigation }) {
  const [canDrive, setCanDrive] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");

  function handleSignUpPress() {
    const userDetails = {
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
      .catch((err) => {
        console.log(err.message);
      });
    navigation.navigate("Splash");
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/chip-in-logo-large.png")}
      />
      <Text style={styles.subtitle}>Tell us a little about youself...</Text>
      <TextInput
        style={styles.textField}
        onChangeText={setFname}
        value={fname}
        placeholder="First name"
      />
      <TextInput
        style={styles.textField}
        onChangeText={setLname}
        value={lname}
        placeholder="Last name"
      />
      <TextInput
        style={styles.textField}
        onChangeText={setUsername}
        value={username}
        placeholder="Username (What others will see)"
      />
      <TextInput
        style={styles.textField}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.textField}
        onChangeText={setPassword}
        secureTextEntry={true}
        value={password}
        placeholder="Password (Must be at least 8 characters)"
      />
      <TextInput
        multiline={true}
        style={styles.bio}
        onChangeText={setBio}
        value={bio}
        placeholder="A brief description of your skills and abilities..."
      />
      <TextInput
        style={styles.textField}
        onChangeText={setLocation}
        value={location}
        placeholder="Your postcode"
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
      <Pressable style={styles.signUpButton} onPress={handleSignUpPress}>
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
});
