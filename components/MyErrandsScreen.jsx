import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { fetchErrandByErrandID, getUserInfo } from "../firebase/config";

export default function MyErrandsScreen({ navigation }) {
  const [myErrands, setMyErrands] = useState([]);

  useEffect(() => {
    getUserInfo().then(({ userData }) => {
      const userErrands = userData.errands;
      const errandPromises = userErrands.map((errandID) => {
        return fetchErrandByErrandID(errandID);
      });
      return Promise.all(errandPromises).then((fulfilledPromises) => {
        setMyErrands([...fulfilledPromises]);
      });
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>

      <Header navigation={navigation} />
      <View style={styles.pageContent}>

        <ScrollView>
          {myErrands.map((errand) => {
            return (
              <View key={errand.errandID} style={styles.listItem}>
                <View style={styles.titleField}>
                  <Text style={{ fontSize: 22 }}>{errand.title}</Text>
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
                  <Text>Location: {errand.location}</Text>
                </View>
                <View style={styles.dateField}>
                  <Text>Date: {errand.date}</Text>
                </View>
                <View style={styles.jobLengthField}>
                  <Text>Job length: {errand.timeFrame}</Text>
                </View>
                <View style={styles.buttonsFlexBox}>
                  <Pressable style={styles.editButton}>
                    <Text>Edit</Text>
                    <Feather name="edit" size={18} color="black" />
                  </Pressable>
                  <Pressable style={styles.deleteButton}>
                    <Text>Delete</Text>
                    <MaterialIcons
                      name="delete-outline"
                      size={22}
                      color="black"
                    />
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
    backgroundColor: "rgba(86, 232, 195, 0.7)",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 110,
    padding: 5,
  },
  deleteButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgba(255, 58, 58, 0.72)",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 100,
    padding: 5,
  },
});
