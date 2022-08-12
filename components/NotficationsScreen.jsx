import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet
} from "react-native";
import { useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";

export default function NotificationsScreen({ navigation }) {
  const [notificationsList, setNotificationsList] = useState([
    "Someone has offered to help",
    "You have a new review",
    "You have an errand update",
    "You have been reported for spitting"
  ]);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>
        {notificationsList.map((notification) => {
          return (
            <View style={styles.notificationContainer}>
              <Text style={{ fontSize: 20 }}>{notification}</Text>
            </View>
          );
        })}
        <View></View>
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1
  },
  notificationContainer: {
    width: "85%",
    flex: 1,
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "#FFF",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 25,
    justifyContent: "center",
    alignItems: "center"
  }
});
