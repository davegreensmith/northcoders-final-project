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

export default function NavBar() {
  return (
    <View style={styles.container}>
      <Feather name="map-pin" size={40} color="black" />
      <Feather name="plus-square" size={40} color="black" />
      <AntDesign name="message1" size={40} color="black" />
      <AntDesign name="user" size={40} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    top: 790,
    flex: 1,
    backgroundColor: "#fff",
    


  }
});
