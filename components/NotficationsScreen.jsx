import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";

export default function NotificationsScreen({ navigation }) {
  const data = [
    {
      message: "Greeners has offered to help you with an errand",
      id: 1,
      sentAt: "10:00 today",
    },
    {
      message: "MitchPlease has offered to help you with an errand",
      id: 2,
      sentAt: "09:20 today",
    },
    {
      message: "HayleyBrinicombe sent you a message",
      id: 3,
      sentAt: "08:10 today",
    },
    {
      message: "Greeners marked an errand you helped with as complete",
      id: 4,
      sentAt: "19:04 yesterday",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "rgb(248, 248, 247)" }}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>
        <Text style={styles.header}>Notifications</Text>
        <FlatList
          data={data}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({ item }) => {
            return (
              <View style={styles.notificationContainer}>
                <Text>{item.message}</Text>
                <Text style={{ color: "#64676B", marginTop: 5 }}>
                  {item.sentAt}
                </Text>
                <Text style={{ color: "teal", marginTop: 5 }}>Dismiss</Text>
              </View>
            );
          }}
        />
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
  },
  notificationContainer: {
    width: "85%",
    flex: 1,
    borderWidth: 1.5,
    borderRadius: 15,
    backgroundColor: "#FFF",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginVertical: 15,
    marginHorizontal: 30,
  },
  header: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 30,
  },
});
