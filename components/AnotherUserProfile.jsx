import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";
import { useEffect, useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { Ionicons } from "@expo/vector-icons";
import { getUserInfo } from "../firebase/config";

export default function ProfileScreen({ route, navigation }) {
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

  const { userId } = route.params;

  useEffect(() => {
    getUserInfo(userId).then(({ userData }) => {
      setProfileInfo(userData);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>
        <View style={styles.avatarFlexBox}>
          <Text style={styles.avatarInitials}>{profileInfo.avatar}</Text>
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
        <ScrollView style={styles.bioContainer}>
          <Text
            style={{
              fontSize: Platform.OS === "android" ? 16 : 14,
              color: "#333333",
            }}
          >
            {profileInfo.bio}
          </Text>
        </ScrollView>
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
    width: "90%",
    flex: 1,
    borderWidth: 0.6,
    borderRadius: 15,
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 15,
    margin: 20,
    marginBottom: 230,
  },
  buttonsFlexBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    marginBottom: 20,
    width: "100%",
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
  },
  myErrandsButtonPressed: {
    backgroundColor: "#357568",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 130,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  iconFlexBox: {
    marginLeft: 1,
  },
  cogButton: {
    borderWidth: 1,
    padding: 0,
    height: 40,
    width: 40,
    borderRadius: 5,
    backgroundColor: "#47c9af",
    justifyContent: "center",
    alignItems: "center",
  },
  cogButtonPressed: {
    borderWidth: 1,
    padding: 0,
    height: 40,
    width: 40,
    borderRadius: 5,
    backgroundColor: "#357568",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitials: {
    color: "#FFFAF0",
    padding: 10,
    fontSize: 80,
  },
});
