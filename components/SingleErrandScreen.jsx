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

export default function SingleErrandScreen({ navigation }) {
  const [singleErrand, setSingleErrand] = useState({
    title: "Chop some trees",
    admin_ward: "Chorlton",
    location: "M16 0AW",
    image: "../assets/placeholder-avatar.png",
    description:
      "Need some help chopping down all the trees in my garden, they're literally everywhere and the squirrels are taking over, I've tried to get rid of them but they just keep  laughing at me.",
    date: "12/08/2022",
    timeFrame: "About 3 hours",
    requirements: "Chainsaw, Axe, Grenades, RPG",
    jobType: "Gardening"
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
                {singleErrand.admin_ward}
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
        <View style={styles.descriptionBubble}>
          <Text>{singleErrand.description}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "space-around" }}>
          <Text style={{ fontSize: 14, marginLeft: 17 }}>
            On: {singleErrand.date}
          </Text>
          <Text style={{ fontSize: 14, marginLeft: 17 }}>
            For: {singleErrand.timeFrame}
          </Text>
          <Text style={{ fontSize: 14, marginLeft: 17 }}>
            What you will need: {singleErrand.requirements}
          </Text>
          <Text style={{ fontSize: 14, marginLeft: 17 }}>
            Type of job: {singleErrand.jobType}
          </Text>
        </View>
        <View>
          <Pressable style={styles.chipInButton}>
            <Text style={{ textAlign: "center", fontSize: 18 }}>Chip In</Text>
          </Pressable>
        </View>
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
    alignItems: "center"
  },
  titleHeader: {
    flexDirection: "row",
    justifyContent: "space-",
    paddingTop: 10
  },
  titleHeaderText: {
    justifyContent: "space-around",
    flex: 0.66,
    marginLeft: 25
  },
  avatarFlexBox: {
    flex: 0.33,
    alignItems: "center"
  },
  avatar: {
    borderRadius: 100
  },
  dividerLine: {
    borderBottomWidth: 2,
    paddingTop: 5,
    width: "90%"
  },
  descriptionBubble: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 0.7,
    width: "90%",
    marginTop: 20,
    marginBottom: 40,
    padding: 10
  },
  chipInButton: {
    backgroundColor: "#47c9af",
    borderWidth: 1,
    borderRadius: 5,
    width: 90,
    margin: 20,
    padding: 10
  }
});
