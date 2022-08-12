import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { Ionicons } from "@expo/vector-icons";
import { getUserInfo } from "../firebase/config";

export default function ProfileScreen({ navigation }) {
  const [profileInfo, setProfileInfo] = useState({
    avatar: "",
    bio: "",
    canDrive: true,
    email: "",
    errands: [],
    fname: "",
    lname: "",
    location: "",
    longLatData: {
      area: "",
      latitude: 0,
      longitude: 0,
    },
    username: "",
  });

  function handleErrandsListPress() {
    navigation.navigate("Errands List");
  }

  useEffect(() => {
    getUserInfo().then(({ userData }) => {
      setProfileInfo(userData);
    });
  }, []);

  function handleSettingsPress() {
    navigation.navigate("Profile Settings");
  }

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>
        <View style={styles.avatarFlexBox}>
          <Text style={styles.avatarInitials}>{profileInfo.avatar}</Text>
          {/* <Image
            style={styles.avatar}
            source={require("../assets/jan-profile-avatar.png")}
          /> */}
        </View>
        <View style={styles.userDetailsFlexBox}>
          <Text style={{ fontSize: Platform.OS === "android" ? 35 : 25 }}>
            {profileInfo.username}
          </Text>
          <Text
            style={{
              fontSize: Platform.OS === "android" ? 28 : 26,
              color: "#B2B2B2",
            }}
          >
            {profileInfo.longLatData.area}
          </Text>
        </View>
        <View style={styles.bioContainer}>
          <Text
            style={{
              fontSize: Platform.OS === "android" ? 16 : 14,
              color: "#333333",
            }}
          >
            {profileInfo.bio}
          </Text>
        </View>
        <View style={styles.buttonsFlexBox}>
          <Pressable
            onPress={handleErrandsListPress}
            style={styles.myErrandsButton}
          >
            <Text>My Errands</Text>
            <Ionicons name="md-list-outline" size={24} color="black" />
          </Pressable>
          <View style={styles.iconFlexBox}>
            <Pressable onPress={handleSettingsPress}>
              <Ionicons name="cog-outline" size={47} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
    alignItems: "center",
  },
  avatarFlexBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    height: 150,
    width: 150,
    backgroundColor: "#47C9AF",
    borderRadius: 75,
    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "#212121",
  },
  avatar: {
    position: "relative",
    borderRadius: 500,
    height: 175,
    width: 175,
  },
  userDetailsFlexBox: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  bioContainer: {
    borderWidth: 0.6,
    borderRadius: 30,
    backgroundColor: "#FFF",
    paddingTop: 22,
    paddingBottom: 22,
    paddingLeft: 8,
    paddingRight: 8,
    margin: 10,
  },
  buttonsFlexBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  myErrandsButton: {
    backgroundColor: "#47c9af",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 130,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginLeft: 15,
  },
  iconFlexBox: {
    marginRight: 10,
    top: 5,
  },
  avatarInitials: {
    color: "#FFFAF0",
    padding: 10,
    fontSize: 80,
  },
});
