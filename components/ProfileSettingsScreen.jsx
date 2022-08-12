import {
  View,
  Text,
  Switch,
  ScrollView,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function ProfileSettingsScreen({ navigation }) {
  const [profileDetails, setProfileDetails] = useState({
    username: "pipe-smoking-rabbit",
    password: "coffee",
    email: "mitchplease02@gmail.com",
    location: "M16 0AW",
    canDrive: true,
    firstName: "Mitch",
    lastName: "Please",
  });
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.pageContent}>
        <Text style={styles.introText}>
          These are your current profile settings...
        </Text>
        <View style={styles.changeUsername}>
          <Text style={styles.fieldLabel}>Username:</Text>
          <Text style={styles.fieldValue}>{profileDetails.username}</Text>
          <Pressable style={styles.editFieldButton}>
            <Feather name="edit" size={18} color="black" />
          </Pressable>
        </View>
        <View style={styles.changeEmail}>
          <Text style={styles.fieldLabel}>Email:</Text>
          <Text style={styles.fieldValue}>{profileDetails.email}</Text>
          <Pressable style={styles.editFieldButton}>
            <Feather name="edit" size={18} color="black" />
          </Pressable>
        </View>
        <View style={styles.changePassword}>
          <Text style={styles.fieldLabel}>Password:</Text>
          <Text style={styles.fieldValue}>{profileDetails.password}</Text>
          <Pressable style={styles.editFieldButton}>
            <Feather name="edit" size={18} color="black" />
          </Pressable>
        </View>
        <View style={styles.changeLocation}>
          <Text style={styles.fieldLabel}>Your Location:</Text>
          <Text style={styles.fieldValue}>{profileDetails.location}</Text>
          <Pressable style={styles.editFieldButton}>
            <Feather name="edit" size={18} color="black" />
          </Pressable>
        </View>
        <View style={styles.changeFirstname}>
          <Text style={styles.fieldLabel}>First Name:</Text>
          <Text style={styles.fieldValue}>{profileDetails.firstName}</Text>
          <Pressable style={styles.editFieldButton}>
            <Feather name="edit" size={18} color="black" />
          </Pressable>
        </View>
        <View style={styles.changeLastname}>
          <Text style={styles.fieldLabel}>Last Name:</Text>
          <Text style={styles.fieldValue}>{profileDetails.lastName}</Text>
          <Pressable style={styles.editFieldButton}>
            <Feather name="edit" size={18} color="black" />
          </Pressable>
        </View>
        <View style={styles.changeCanDrive}>
          <Text style={styles.fieldLabel}>Can you drive?</Text>
          <Switch
            style={{ height: 15 }}
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
        <View style={styles.logoutFlex}>
          <Text style={styles.fieldLabel}>Logout:</Text>
          <Pressable>
            <SimpleLineIcons name="logout" size={24} color="black" />
          </Pressable>
        </View>
      </View>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  introText: {
    flex: 1,
    fontSize: 14,
    textAlignVertical: "center",
    marginLeft: 10,
  },
  fieldLabel: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  fieldValue: {
    fontSize: 16,
    marginRight: 5,
    borderRadius: 10,
    padding: 8,
    backgroundColor: "white",
  },
  editFieldButton: {
    marginRight: 10,
    backgroundColor: "white",
  },
  changeUsername: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "gray",
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    flex: 1,
  },
  changePassword: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "gray",
    borderBottomWidth: 0.2,
    flex: 1,
  },
  changeEmail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "gray",
    borderBottomWidth: 0.2,
    flex: 1,
  },
  changeLocation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "gray",
    borderBottomWidth: 0.2,
    flex: 1,
  },
  changeFirstname: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "gray",
    borderBottomWidth: 0.2,
    flex: 1,
  },
  changeLastname: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "gray",
    borderBottomWidth: 0.2,
    flex: 1,
  },
  changeCanDrive: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignItems: "center",
    borderColor: "gray",
    borderBottomWidth: 0.2,
    flex: 1,
  },
  logoutFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignItems: "center",
    borderColor: "gray",
    borderBottomWidth: 0.2,
    flex: 1,
  },
});
