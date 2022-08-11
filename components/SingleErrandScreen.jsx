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

export default function SingleErrandScreen({ navigation }) {
  const [singleErrand, setSingleErrand] = useState({
    title: "Chop some trees",
    location: "M16 3EF",
    image: "../assets/placeholder-avatar.png",
    description:
      "Need some help chopping down all the trees in my garden, they're literally everywhere and the squirrels are taking over, I've tried to get rid of them but they just keep  laughing at me.",
    date: "12/08/2022",
    timeFrame: "About 3 hours",
    requirements: "Chainsaw, Axe, Grenades, RPG",
    jobType: "Gardening",
  });

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.pageContent}>
        <View style={styles.titleHeader}>
          <View style={styles.titleHeaderText}>
            <View>
              <Text style={{ fontSize: 26 }}>{singleErrand.title}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 20, color: "gray" }}>
                {singleErrand.jobType}
              </Text>
            </View>
          </View>
          <View style={styles.avatarFlexBox}>
            <Image
              style={styles.avatar}
              source={require("../assets/placeholder-avatar.png")}
            />
          </View>
        </View>
        <View style={styles.dividerLine}></View>
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
    alignItems: "center",
  },
  titleHeader: {
    flexDirection: "row",
    justifyContent: "space-",
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  titleHeaderText: {
    justifyContent: "space-around",
    flex: 0.66,
    marginLeft: 25,
  },
  avatarFlexBox: {
    flex: 0.33,
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  avatar: {
    borderRadius: 100,
  },
  dividerLine: {
    borderBottomWidth: 2,
    paddingTop: 5,
    width: "90%",
  },
});
