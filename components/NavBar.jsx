import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  Pressable,
  SafeAreaView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";


export default function NavBar({navigation}) {
  function handleMapPress() {
    navigation.navigate("Map")
  }
  function handleAddErrandPress() {
    navigation.navigate("Add Errand");
  }
  function handleChatsPress() {
    navigation.navigate("Chats");
  }
  function handleProfilePress() {
    navigation.navigate("Profile");
  }

  return (
    <View style={styles.navBarContainer}>
      <Pressable style={styles.navBarIcon} onPress={handleMapPress}>
        <Feather name="map-pin" size={35} color="black" />
      </Pressable>
      <Pressable style={styles.navBarIcon} onPress={handleAddErrandPress}>
        <Feather name="plus-square" size={35} color="black" />
      </Pressable>
      <Pressable style={styles.navBarIcon} onPress={handleChatsPress}>
        <AntDesign name="message1" size={35} color="black" />
      </Pressable>
      <Pressable style={styles.navBarIcon} onPress={handleProfilePress}>
        <AntDesign name="user" size={35} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navBarContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    top: 749,
    backgroundColor: "#fff",
  },
  navBarIcon: {
    flex: 1,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    borderTopColor: "#000",
    borderRightColor: "#F2F2F2",
    borderRightWidth: 1,
    borderTopWidth: 1,
  },
});
