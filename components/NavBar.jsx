import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function NavBar({ navigation }) {
  const route = useRoute();

  function handleMapPress() {
    navigation.navigate("Map");
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
        {route.name === "Map" ? (
          <MaterialCommunityIcons name="map-marker" size={35} color="#47C9AF" />
        ) : (
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={35}
            color="black"
          />
        )}
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
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    bottom: 0,
    backgroundColor: "#fff",
  },
  navBarIcon: {
    flex: 1,
    padding: 15,
    paddingBottom: Platform.OS === "android" ? 15 : 35,
    flexDirection: "row",
    justifyContent: "center",
    borderTopWidth: 0.7,
  },
});

// map
{
  /* <MaterialCommunityIcons name="map-marker" size={24} color="black" />;
<MaterialCommunityIcons name="map-marker-outline" size={24} color="black" />; */
}

// plus
{
  /* <FontAwesome name="plus-square" size={24} color="black" />
<FontAwesome name="plus-square-o" size={24} color="black" />; */
}

// chat
{
  /* <Ionicons name="chatbubble-ellipses" size={24} color="black" />
<Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />; */
}

// profile
{
  /* <FontAwesome5 name="user" size={24} color="black" />;
<FontAwesome5 name="user-alt" size={24} color="black" />; */
}
