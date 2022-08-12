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

export default function NotificationScreen({ navigation }) {
  const [notificationsList, setNotificationsList] = useState(["someone has offered to help", "you have a new review", "you have a errand update"]);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.pageContent}></View>
      <NavBar />
    </View>
  );
}
const styles = StyleSheet.create({
  pageContent: {
    flex: 1
  }
});
