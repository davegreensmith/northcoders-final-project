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
    "someone has offered to help",
    "you have a new review",
    "you have an errand update",
    "you have been reported for spitting",
  ]);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}></View>
      <NavBar navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
  },
});
