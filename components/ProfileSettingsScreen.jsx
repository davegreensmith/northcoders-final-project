import {
  View,
  Text,
  Switch,
  ScrollView,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useRef } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function ProfileSettingsScreen({ navigation }) {
  const [profileDetails, setProfileDetails] = useState({
    username: "pipe-smoking-rabbit",
    location: "M16 0AW",
    canDrive: true,
    firstName: "Mitch",
    lastName: "Please",
  });

  const [isUsernameEdit, setIsUsernameEdit] = useState(false);
  const username = useRef();

  function handleUsernameEditPress() {
    setIsUsernameEdit(true);
    username.current.focus();
  }
  function handleUsernameChange() {
    setIsUsernameEdit(false);
  }

  const [isLocationEdit, setIsLocationEdit] = useState(false);
  const location = useRef();

  function handleLocationEditPress() {
    setIsLocationEdit(true);
    location.current.focus();
  }
  function handleLocationChange() {
    setIsLocationEdit(false);
  }

  const [isFirstNameEdit, setIsFirstNameEdit] = useState(false);
  const firstName = useRef();

  function handleFirstNameEditPress() {
    setIsFirstNameEdit(true);
    firstName.current.focus();
  }
  function handleFirstNameChange() {
    setIsFirstNameEdit(false);
  }

  const [isLastNameEdit, setIsLastNameEdit] = useState(false);
  const lastName = useRef();

  function handleLastNameEditPress() {
    setIsLastNameEdit(true);
    lastName.current.focus();
  }
  function handleLastNameChange() {
    setIsLastNameEdit(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>
        <View style={styles.changeUsername}>
          <Text style={styles.fieldLabel}>Username:</Text>
          <TextInput
            ref={username}
            style={isUsernameEdit ? styles.editFieldValue : styles.fieldValue}
            defaultValue={profileDetails.username}
            onFocus={() => {
              setIsUsernameEdit(true);
            }}
            onBlur={handleUsernameChange}
          />
          <Pressable
            onPress={handleUsernameEditPress}
            style={styles.editFieldButton}
          >
            <Feather name="edit" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.changeLocation}>
          <Text style={styles.fieldLabel}>Your Location:</Text>
          <TextInput
            ref={location}
            style={isLocationEdit ? styles.editFieldValue : styles.fieldValue}
            defaultValue={profileDetails.location}
            onFocus={() => {
              setIsLocationEdit(true);
            }}
            onBlur={handleLocationChange}
          />
          <Pressable
            onPress={handleLocationEditPress}
            style={styles.editFieldButton}
          >
            <Feather name="edit" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.changeFirstname}>
          <Text style={styles.fieldLabel}>First Name:</Text>
          <TextInput
            ref={firstName}
            style={isFirstNameEdit ? styles.editFieldValue : styles.fieldValue}
            defaultValue={profileDetails.firstName}
            onFocus={() => {
              setIsFirstNameEdit(true);
            }}
            onBlur={handleFirstNameChange}
          />
          <Pressable
            onPress={handleFirstNameEditPress}
            style={styles.editFieldButton}
          >
            <Feather name="edit" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.changeLastname}>
          <Text style={styles.fieldLabel}>Last Name:</Text>
          <TextInput
            ref={lastName}
            style={isLastNameEdit ? styles.editFieldValue : styles.fieldValue}
            defaultValue={profileDetails.lastName}
            onFocus={() => {
              setIsLastNameEdit(true);
            }}
            onBlur={handleLastNameChange}
          />
          <Pressable
            onPress={handleLastNameEditPress}
            style={styles.editFieldButton}
          >
            <Feather name="edit" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.changeCanDrive}>
          <Text style={styles.fieldLabel}>Can you drive?</Text>
          <Switch
            style={{ height: 15, marginRight: 15 }}
            value={profileDetails.canDrive}
            onValueChange={() => {
              setProfileDetails((previousSettings) => {
                const newSettings = { ...previousSettings };
                newSettings.canDrive = !newSettings.canDrive;
                return newSettings;
              });
            }}
          />
        </View>
        <View style={styles.submitFlexBox}>
          <View style={styles.dividerLine}></View>
          <Pressable style={styles.submitButton}>
            <Text>Submit Changes</Text>
          </Pressable>
          <View style={styles.dividerLine}></View>
        </View>
        <View style={styles.changePassword}>
          <Text style={styles.fieldLabel}>Send Password Reset Link:</Text>
          <Pressable style={styles.passwordResetButton}>
            <MaterialCommunityIcons
              name="email-send-outline"
              size={26}
              color="black"
            />
          </Pressable>
        </View>
        <View style={styles.logoutFlex}>
          <Text style={styles.fieldLabel}>Logout:</Text>
          <Pressable style={styles.logoutButton}>
            <SimpleLineIcons name="logout" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.logoutFlex}>
          <Text style={styles.fieldLabel}>Delete Account:</Text>
          <Pressable style={styles.deleteButton}>
            <AntDesign name="deleteuser" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  fieldLabel: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  fieldValue: {
    fontSize: 16,
    marginRight: 15,
    borderRadius: 10,
    padding: 8,
    width: 220,
    color: "black",
    backgroundColor: "white",
    textAlign: "center",
  },
  editFieldValue: {
    fontSize: 16,
    marginRight: 15,
    borderRadius: 10,
    padding: 8,
    width: 220,
    borderColor: "#47c9af",
    borderWidth: 1,
    backgroundColor: "white",
    textAlign: "center",
  },
  editFieldButton: {
    marginRight: 15,
  },
  changeUsername: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    flex: 1,
  },
  changeEmail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  changeLocation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  changeFirstname: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  changeLastname: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  changeCanDrive: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignItems: "center",
    flex: 1,
  },
  submitFlexBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#47c9af",
    borderWidth: 1,
    borderRadius: 5,
    width: 120,
    height: 40,
    padding: 5,
  },
  dividerLine: {
    borderWidth: 0.5,
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  changePassword: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  passwordResetButton: {
    marginRight: 16,
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "white",
  },
  logoutFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignItems: "center",
    flex: 1,
  },
  logoutButton: {
    marginRight: 16,
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "white",
  },
  deleteButton: {
    marginRight: 16,
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "rgba(255, 58, 58, 0.72)",
  },
});
