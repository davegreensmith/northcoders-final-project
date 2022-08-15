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
  const [notificationsList, setNotificationsList] = useState([
    { message: "Someone has offered to help", id: 1 },
    { message: "You have a new review", id: 2 },
    { message: "You have an errand update", id: 3 },
    { message: "You have been reported for spitting", id: 4 },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>
        {notificationsList.map((notification) => {
          return (
            <View key={notification.id} style={styles.notificationContainer}>
              <Text style={{ fontSize: 20 }}>{notification.message}</Text>
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
    flex: 1,
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
    alignItems: "center",
  },
});
