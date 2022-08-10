import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";

export default function ProfileScreen() {
  return (
    <View>
      <Header />
      <View style={styles.pageContent}>
        <View style={styles.avatarFlexBox}>
          <Image
            style={styles.avatar}
            source={require("../assets/jan-profile-avatar.png")}
          />
        </View>
        <View style={styles.userDetailsFlexBox}>
          <Text style={{ fontSize: 35 }}>jan_the_boatman</Text>
          <Text style={{ fontSize: 28, color: "#B2B2B2" }}>Gatwick</Text>
        </View>
        <View style={styles.bioContainer}>
          <Text style={{ fontSize: 16, color: "#333333" }}>
            Hi my name is Jan, I'm pretty good at rowing so I can easily help
            out with heavy lifting jobs! *Only interested in jobs where I'm
            allowed to spit.*
          </Text>
        </View>
      </View>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarFlexBox: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
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
    borderWidth: 0.4,
    borderRadius: 30,
    backgroundColor: "#FFF",
    paddingTop: 22,
    paddingBottom: 22,
    paddingLeft: 8,
    paddingRight: 8,
    margin: 10,
  },
});
