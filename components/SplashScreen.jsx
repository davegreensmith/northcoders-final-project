import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import Header from "./Header";
import NavBar from "./NavBar";

export default function SplashScreen({ navigation }) {
  function handleGiveHelpPress() {
    navigation.navigate("Map");
  }

  function wantHelpPress() {
    navigation.navigate("Add Errand");
  }
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.introText}>What are you looking for...</Text>
        <View style={styles.pageContent}>
          <Pressable
            android_ripple={{ color: "white", borderless: false }}
            style={styles.volunteerButton}
            onPress={handleGiveHelpPress}
          >
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              Volunteer your time?
            </Text>
          </Pressable>
          <View style={styles.dividerFlex}>
            <View style={styles.dividerLine}></View>
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine}></View>
          </View>
          <Pressable
            android_ripple={{ color: "white", borderless: false }}
            style={styles.helpButton}
            onPress={wantHelpPress}
          >
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              Need help?
            </Text>
          </Pressable>
        </View>
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  introText: {
    fontSize: 18,
    marginTop: 50,
  },
  pageContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 40,
  },
  volunteerButton: {
    justifyContent: "center",
    backgroundColor: "#47c9af",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    width: 260,
    height: 85,
    padding: 10,
  },
  helpButton: {
    justifyContent: "center",
    backgroundColor: "#47c9af",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    width: 260,
    height: 85,
    padding: 10,
  },
  dividerFlex: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    width: "100%",
  },
  dividerLine: {
    borderWidth: 1.5,
    width: 100,
    bottom: 10,
  },
  dividerText: {
    fontSize: 20,
  },
});
