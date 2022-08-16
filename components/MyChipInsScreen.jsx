import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  deleteErrand,
  deleteLatLongByErrandId,
  fetchErrandByErrandID,
  fetchErrandsByUserID,
  getUserInfo,
  loggedInUserId,
  removeUserFromErrand,
  updateUserErrandList,
} from "../firebase/config";

export default function MyChipInsScreen({ navigation }) {
  const [myChipIns, setMyChipIns] = useState([]);
  const [refreshPage, setRefreshPage] = useState(true);

  const [editButtonPressed, setEditButtonPressed] = useState(false);

  function handleRemoveName(errandID) {
    removeUserFromErrand(errandID);
    const chipInArray = [...myChipIns];
    const newArray = chipInArray.filter((errand) => {
      return errand.id !== errandID;
    });
    setMyChipIns(newArray);
  }

  useEffect(() => {
    fetchErrandsByUserID().then((data) => {
      setMyChipIns([...data]);
    });
  }, [refreshPage]);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.pageContent}
        keyboardShouldPersistTaps="always"
      >
        {myChipIns.length > 0 ? (
          myChipIns.map((errand) => {
            return (
              <View key={errand.id} style={styles.listItem}>
                <View style={styles.titleField}>
                  <Text style={{ fontSize: 22 }}>{errand.errandName}</Text>
                </View>
                <View style={styles.descriptionField}>
                  <Text>{errand.description}</Text>
                </View>
                <View style={styles.requirementsField}>
                  <Text>Helper Requirements: {errand.requirements}</Text>
                </View>
                <View style={styles.jobTypeField}>
                  <Text>Job Type: {errand.workType}</Text>
                </View>
                <View style={styles.locationField}>
                  <Text>Location: {errand.area}</Text>
                </View>
                <View style={styles.dateField}>
                  <Text>Date: {errand.date}</Text>
                </View>
                <View style={styles.jobLengthField}>
                  <Text>Job length: {errand.timeFrame}</Text>
                </View>
                <View style={styles.buttonsFlexBox}>
                  <Pressable
                    onPress={() => {
                      handleRemoveName(errand.id);
                    }}
                    onPressIn={() => setEditButtonPressed(true)}
                    onPressOut={() => setEditButtonPressed(false)}
                    style={
                      editButtonPressed
                        ? styles.editButtonPressed
                        : styles.editButton
                    }
                  >
                    <Text>Chip Out</Text>
                    <MaterialCommunityIcons
                      name="head-remove-outline"
                      size={22}
                      color="black"
                    />
                  </Pressable>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.noChipInsPage}>
            <View style={styles.noChipsInsBubble}>
              <Text style={{ textAlign: "center" }}>
                You aren't currently helping anyone, pull your finger out and
                start volunteering! 😉
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
  },
  listItem: {
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
  },
  titleField: {
    justifyContent: "center",

    padding: 15,
  },
  descriptionField: {
    justifyContent: "center",
    backgroundColor: "#fff",
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    padding: 10,
  },
  requirementsField: {
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    padding: 10,
  },
  jobTypeField: {
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    padding: 10,
  },
  locationField: {
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    padding: 10,
  },
  dateField: {
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    padding: 10,
  },
  jobLengthField: {
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    padding: 10,
  },
  buttonsFlexBox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  editButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgba(255, 58, 58, 0.72)",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 120,
    padding: 5,
  },
  editButtonPressed: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgba(149, 37, 37, 1)",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 120,
    padding: 5,
  },
  noChipInsPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noChipsInsBubble: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    margin: 10,
    borderWidth: 0.5,
    borderColor: "gray",
  },
});
