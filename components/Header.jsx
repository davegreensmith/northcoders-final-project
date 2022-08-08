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

export default function Header() {
  return (
    <SafeAreaView style={styles.headerFlex}>
      <Image
        style={styles.logo}
        source={require("../assets/chip-in-logo-1.png")}
      />
      <View style={styles.icon}>
        <Ionicons name="notifications" size={35} color="black" />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  logo: {
    resizeMode: "cover",
    height: 75,
    width: 75,
    margin: 0,
    marginLeft: 30,
    bottom: 5
  },
  headerFlex: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: "1",
    alignItems: "center"
  },
  icon: {
    left: 215
  }
});
