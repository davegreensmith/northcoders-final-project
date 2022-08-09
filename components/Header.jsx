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
import { FontAwesome5 } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.headerFlex}>
      <View style={styles.logoFlex}>
        <Image
          style={styles.logo}
          source={require("../assets/chip-in-logo-1.png")}
        />
      </View>
      <View style={styles.icon}>
        {/* <Ionicons name="notifications" size={30} color="black" /> */}
        <FontAwesome5 name="bell" size={35} color="black" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  logo: {
    resizeMode: "cover",
    height: 75,
    width: 75,
    margin: 0,
    left: 50,
  },
  logoFlex: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  headerFlex: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    alignItems: "center",
    marginTop: 35,
  },
  icon: {
    marginRight: 30,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
