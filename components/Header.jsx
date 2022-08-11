import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  Pressable,
  SafeAreaView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.headerFlex}>
      <View style={styles.whiteSpace}></View>
      <View style={styles.logoFlex}>
        <Image
          style={styles.logo}
          source={require("../assets/chip-in-logo.png")}
        />
      </View>
      <View style={styles.iconFlex}>
        <Pressable style={styles.iconButton}>
          <FontAwesome5 name="bell" size={35} color="black" />
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerFlex: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    borderBottomWidth: 0.7,
    height: Platform.OS === "android" ? 110 : 125,
  },
  whiteSpace: {
    flex: 1,
  },
  logoFlex: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    resizeMode: "contain",
    height: 75,
    width: 75,
  },
  iconFlex: {
    flex: 1,
    alignItems: "flex-end",
  },
  iconButton: {
    marginRight: 20,
    marginBottom: 12,
  },
});
