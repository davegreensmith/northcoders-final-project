import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { Feather } from "@expo/vector-icons";
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

  function handleRemoveName(errandID) {
    removeUserFromErrand(errandID);
    const chipInArray = [...myChipIns];
    const newArray = chipInArray.filter((errand) => {
      return errand.id !== errandID;
    });
    setMyChipIns(newArray);
  }

  useEffect(() => {
    return fetchErrandsByUserID().then((data) => {
      setMyChipIns([...data]);
    });
  }, [refreshPage]);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>
        <ScrollView keyboardShouldPersistTaps="always">
          {myChipIns.map((errand) => {
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
                    android_ripple={{ color: "white", borderless: false }}
                    onPress={() => {
                      handleRemoveName(errand.id);
                    }}
                    style={styles.editButton}
                  >
                    <Text>Remove my name</Text>
                    <Feather name="edit" size={18} color="black" />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
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
    width: 160,
    padding: 5,
  },
});
