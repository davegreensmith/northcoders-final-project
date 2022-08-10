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

export default function SignUpScreen() {
  const [canDrive, setCanDrive] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/chip-in-logo.png")}
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
        multiline={true}
        style={styles.bio}
        placeholder="A brief description of your skills and abilities..."
      />
      <TextInput style={styles.textField} placeholder="Your postcode" />
      <View style={styles.doYouDrive}>
        <Text style={{ fontSize: 15 }}>Do you drive?</Text>
        <Switch
          value={canDrive}
          onValueChange={() => {
            setCanDrive(!canDrive);
          }}
        />
      </View>
      <Pressable style={styles.signUpButton}>
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
    height: 35,
    margin: 8,
    textAlign: "left",
    padding: 5,
    fontSize: 15,
  },
  bio: {
    borderColor: "#000",
    borderWidth: 1,
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
