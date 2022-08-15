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
import { useEffect, useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { fetchErrandByErrandID } from "../firebase/config";

export default function SingleErrandScreen({ route, navigation }) {
  const { id } = route.params;

  const [singleErrand, setSingleErrand] = useState({});

  useEffect(() => {
    fetchErrandByErrandID(id).then((errandData) => {
      setSingleErrand({ ...errandData });
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>
        <View style={styles.titleHeader}>
          <View style={styles.titleHeaderText}>
            <View>
              <Text style={{ fontSize: 26 }}>{singleErrand.errandName}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 20, color: "gray" }}>
                {singleErrand.area}
              </Text>
            </View>
          </View>
          <View style={styles.avatarFlexBox}>
            {/* <Image
              style={styles.avatar}
              source={require("../assets/placeholder-avatar.png")}
            /> */}
            <Text>{singleErrand.author}</Text>
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
            For: {singleErrand.timeFrame} hours
          </Text>
          <Text style={{ fontSize: 14, marginLeft: 17 }}>
            What you will need: {singleErrand.requirements}
          </Text>
          <Text style={{ fontSize: 14, marginLeft: 17 }}>
            Type of job: {singleErrand.workType}
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
    alignItems: "center",
  },
  titleHeader: {
    flexDirection: "row",
    justifyContent: "space-",
    paddingTop: 10,
  },
  titleHeaderText: {
    justifyContent: "space-around",
    flex: 0.66,
    marginLeft: 25,
  },
  avatarFlexBox: {
    flex: 0.33,
    alignItems: "center",
  },
  avatar: {
    borderRadius: 100,
  },
  dividerLine: {
    borderBottomWidth: 2,
    paddingTop: 5,
    width: "90%",
  },
  descriptionBubble: {
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 0.7,
    width: "90%",
    marginTop: 20,
    marginBottom: 40,
    padding: 10,
  },
  chipInButton: {
    backgroundColor: "#47c9af",
    borderWidth: 1,
    borderRadius: 5,
    width: 90,
    margin: 20,
    padding: 10,
  },
});
