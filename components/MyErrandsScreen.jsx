import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function MyErrandsScreen({ navigation }) {
  const [myErrands, setMyErrands] = useState([
    {
      errand_id: 1,
      title: "Example Title",
      description:
        "this is my job description, it's not the best job in the world but it's mine.",
      requirements: "None",
      location: "M1 4DH",
      date: "10/08/2022",
      timeFrame: "1 Hour",
      jobType: "Gardening",
    },
    {
      errand_id: 2,
      title: "Example Title",
      description:
        "this is my job description, it's not the best job in the world but it's mine.",
      requirements: "None",
      location: "M1 4DH",
      date: "10/08/2022",
      timeFrame: "1 Hour",
      jobType: "Gardening",
    },
  ]); // this is a placeholder for functionality to "get" the list of errands attached to the user profile and store as an array of objects, for the purposes of display

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={stlyes.pageContent}>
        <ScrollView>
          {myErrands.map((errand) => {
            return (
              <View key={errand.errand_id} style={stlyes.listItem}>
                <View style={stlyes.titleField}>
                  <Text style={{ fontSize: 22 }}>{errand.title}</Text>
                </View>
                <View style={stlyes.descriptionField}>
                  <Text>{errand.description}</Text>
                </View>
                <View style={stlyes.requirementsField}>
                  <Text>Helper Requirements: {errand.requirements}</Text>
                </View>
                <View style={stlyes.jobTypeField}>
                  <Text>Job Type: {errand.jobType}</Text>
                </View>
                <View style={stlyes.locationField}>
                  <Text>Location: {errand.location}</Text>
                </View>
                <View style={stlyes.dateField}>
                  <Text>Date: {errand.date}</Text>
                </View>
                <View style={stlyes.jobLengthField}>
                  <Text>Job length: {errand.timeFrame}</Text>
                </View>
                <View style={stlyes.buttonsFlexBox}>
                  <Pressable style={stlyes.editButton}>
                    <Text>Edit</Text>
                    <Feather name="edit" size={18} color="black" />
                  </Pressable>
                  <Pressable style={stlyes.deleteButton}>
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

const stlyes = StyleSheet.create({
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
