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
    const [myErrands, setMyErrands] = useState([{title: "Example", description: "this is my job description, it's not the best job in the world but it's mine.", requirements: "None", location: "M1 4DH", date: "10/08/2022", timeFrame: "1 Hour", jobType: "Gardening"}]) // this is a placeholder for functionality to "get" the list of errands attached to the user profile and store as an array of objects, for the purposes of display

    return (
        <View>
            <Header />
            <ScrollView>
                {myErrands.map(errand=>{
                    <View>
                        <Text>{errand.title}</Text>
                        <Text>{errand.description}</Text>
                        <Text>Requirements: {errand.requirements}</Text>
                        <Text>Job Type:{errand.jobType}</Text>
                        <Text>Location:{errand.location}</Text>
                        <Text>Date: {errand.date}</Text>
                        <Text>Job length: {errand.timeFrame}</Text>
                    </View>
                })}
            </ScrollView>
            <NavBar navigation={navigation}/>
        </View>
    )
}

const stlyes = StyleSheet.create({
    
})
