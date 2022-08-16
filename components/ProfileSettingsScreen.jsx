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
import { CommonActions } from "@react-navigation/native";
import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  getUserInfo,
  updateUserInfo,
  sendResetPasswordEmail,
  auth,
  deleteErrandByErrandID,
  fetchErrandsByUserID,
  removeUserFromErrand,
} from "../firebase/config";
import { getAuth, deleteUser } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export default function ProfileSettingsScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [location, setLocation] = useState("");
  const [canDrive, setCanDrive] = useState(true);
  const [fieldChanged, setFieldChanged] = useState(false);
  const [emailMessage, setEmailMessage] = useState(false);
  const [wantToDelete, setWantToDelete] = useState(false);
  const [myErrands, setMyErrands] = useState([]);
  const [myChipIns, setMyChipIns] = useState([]);
  const [loggedInUserId, setLoggedInUser] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState("");

  function handleSubmitChanges() {
    if (fieldChanged) {
      const body = { username, fname, lname, location, canDrive };
      updateUserInfo(loggedInUserId, body);
    }
  }

  function handleSendPasswordLink() {
    sendResetPasswordEmail(userEmail);
    setEmailMessage("Please check your email for link to reset password");
  }

  function handleLogOut() {
    auth.signOut();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Login" }],
      })
    );
  }

  function handleDeleteAccount() {
    setWantToDelete(true);
  }

  function definatelyDeleteAccount() {
    const myErrandList = [...myErrands];
    myErrands.forEach((errand) => {
      deleteErrandByErrandID(errand);
    });

    //remove chips
    fetchErrandsByUserID(loggedInUserId)
      .then((data) => {
        setMyChipIns([...data]);
      })
      .then(() => {
        const myChipInArray = [...myChipIns];
        myChipInArray.forEach((errand) => {
          removeUserFromErrand(errand.id);
        });
      });

    //delete account
    deleteUser(currentLoggedInUser)
      .then(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "Login" }],
          })
        );
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  }

  useEffect(() => {
    getUserInfo().then(({ userData }) => {
      const { username, fname, lname, location, canDrive, errands } = userData;
      setFname(fname);
      setLname(lname);
      setCanDrive(canDrive);
      setUsername(username);
      setLocation(location);
      setMyErrands(errands);
    });
    const auth = getAuth();
    const user = auth.currentUser;
    setLoggedInUser(user.uid);
    setUserEmail(user.email);
    setCurrentLoggedInUser(user);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>
        <View style={styles.changeUsername}>
          <Text style={styles.fieldLabel}>Username:</Text>
          <TextInput
            value={username}
            onChangeText={(newValue) => {
              setUsername(newValue);
              setFieldChanged(true);
            }}
            style={styles.editFieldValue}
            onFocus={() => {}}
          />
        </View>
        <View style={styles.changeLocation}>
          <Text style={styles.fieldLabel}>Your Location:</Text>
          <TextInput
            value={location}
            onChangeText={(newValue) => {
              setLocation(newValue);
              setFieldChanged(true);
            }}
            style={styles.editFieldValue}
            defaultValue={location}
            onFocus={() => {}}
          />
        </View>
        <View style={styles.changeFirstname}>
          <Text style={styles.fieldLabel}>First Name:</Text>
          <TextInput
            value={fname}
            onChangeText={(newValue) => {
              setFieldChanged(true);
              setFname(newValue);
            }}
            style={styles.editFieldValue}
            defaultValue={fname}
            onFocus={() => {}}
          />
        </View>
        <View style={styles.changeLastname}>
          <Text style={styles.fieldLabel}>Last Name:</Text>
          <TextInput
            value={lname}
            onChangeText={(newValue) => {
              setLname(newValue);
              setFieldChanged(true);
            }}
            style={styles.editFieldValue}
            defaultValue={lname}
            onFocus={() => {}}
          />
        </View>
        <View style={styles.changeCanDrive}>
          <Text style={styles.fieldLabel}>Can you drive?</Text>
          <Switch
            style={{ height: 15, marginRight: 15 }}
            value={canDrive}
            onValueChange={() => {
              setCanDrive(!canDrive);
              setFieldChanged(true);
            }}
          />
        </View>
        <View style={styles.submitFlexBox}>
          <View style={styles.dividerLine}></View>
          <Pressable style={styles.submitButton} onPress={handleSubmitChanges}>
            <Text style={{ fontSize: Platform.OS === "android" ? 16 : 11 }}>
              Submit Changes
            </Text>
          </Pressable>
          <View style={styles.dividerLine}></View>
        </View>
        <View style={styles.changePassword}>
          <Text style={styles.fieldLabel}>Send Password Reset Link:</Text>
          <Pressable
            style={styles.passwordResetButton}
            onPress={handleSendPasswordLink}
          >
            <MaterialCommunityIcons
              name="email-send-outline"
              size={26}
              color="black"
            />
          </Pressable>
        </View>
        <View style={styles.popUpMessage}>
          {emailMessage ? (
            <Text style={{ color: "#47C9AF" }}>{emailMessage}</Text>
          ) : (
            <></>
          )}
        </View>
        <View style={styles.logoutFlex}>
          <Text style={styles.fieldLabel}>Logout:</Text>
          <Pressable style={styles.logoutButton} onPress={handleLogOut}>
            <SimpleLineIcons name="logout" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.logoutFlex}>
          <Text style={styles.fieldLabel}>Delete Account:</Text>
          <Pressable style={styles.deleteButton} onPress={handleDeleteAccount}>
            <AntDesign name="deleteuser" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.actualDeleteContainer}>
          {wantToDelete ? (
            <Pressable
              style={styles.actualDeleteButton}
              onPress={definatelyDeleteAccount}
            >
              <Text>Delete account - Are you sure?</Text>
            </Pressable>
          ) : (
            <></>
          )}
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
    fontSize: Platform.OS === "android" ? 16 : 14,
    marginLeft: 15,
    flex: 1,
  },
  fieldValue: {
    fontSize: Platform.OS === "android" ? 16 : 14,
    marginRight: 15,
    borderRadius: 10,
    padding: 8,
    width: 220,
    color: "black",
    backgroundColor: "white",
    textAlign: "center",
  },
  editFieldValue: {
    fontSize: Platform.OS === "android" ? 16 : 14,
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
  actualDeleteButton: {
    alignItems: "center",
    marginRight: 16,
    marginBottom: 16,
    borderWidth: 0.5,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "rgba(255, 58, 58, 0.72)",
    width: 300,
  },
  actualDeleteContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popUpMessage: {
    color: "#47C9AF",
    alignItems: "center",
  },
});
