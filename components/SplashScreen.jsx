import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  Pressable,
  ScrollView
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
    <View>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable style={styles.volunteerButton} onPress={handleGiveHelpPress}>
          <Text style={{ textAlign: "center", fontSize: 25 }}>
            Volunteer your time?
          </Text>
        </Pressable>
        <Pressable style={styles.helpButton} onPress={wantHelpPress}>
          <Text style={{TextInput: "center", textAlign: "center", fontSize: 25 }}>Want help?</Text>
        </Pressable>
      </ScrollView>
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  volunteerButton: {
    backgroundColor: "#47c9af",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    width: 270,
    margin: 20,
    padding: 10,
    marginBottom: 90,
    
  },
  helpButton: {
    backgroundColor: "#47c9af",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    width: 270,
    height: 100,
    margin: 20,
    padding: 10,
    marginTop:20,
    textAlignVertical: "center",
    
    
    
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 150
  }
});
