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

export default function MyErrandsScreen({ navigation }) {
    const [myErrands, setMyErrands] = useState([{title: "Example Title", description: "this is my job description, it's not the best job in the world but it's mine.", requirements: "None", location: "M1 4DH", date: "10/08/2022", timeFrame: "1 Hour", jobType: "Gardening"}]) // this is a placeholder for functionality to "get" the list of errands attached to the user profile and store as an array of objects, for the purposes of display

    return (
        <View>
            <Header />
            <ScrollView>
                {myErrands.map(errand=>{
                    return (
                      <View>
                        <Text>{errand.title}</Text>
                        <Text>{errand.description}</Text>
                        <Text>Requirements: {errand.requirements}</Text>
                        <Text>Job Type:{errand.jobType}</Text>
                        <Text>Location:{errand.location}</Text>
                        <Text>Date: {errand.date}</Text>
                        <Text>Job length: {errand.timeFrame}</Text>
                        <View style={stlyes.buttonsFlexBox}>
                          <Pressable style={stlyes.editButton}>
                            <Text>Update</Text>
                          </Pressable>
                          <Pressable style={stlyes.deleteButton}>
                            <Text>Delete Errand</Text>
                          </Pressable>
                        </View>
                      </View>
                    );
                })}
            </ScrollView>
            <NavBar navigation={navigation}/>
        </View>
    )
}

const stlyes = StyleSheet.create({
  buttonsFlexBox: {
    flexDirection: "row",

    justifyContent: "center",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "rgba(255, 58, 58, 0.72)",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    height: 35,
    width: 120,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  editButton: {
    backgroundColor: "##47c9af",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    height: 35,
    width: 85,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
});
