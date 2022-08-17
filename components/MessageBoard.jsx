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
import { createMessageAndAddIdToExistingErrands } from "../firebase/config";
import { useEffect, useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";

export default function MessageBoard({ navigation }, { route }) {
  useEffect(() => {}, []);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.pageContent}
        keyboardShouldPersistTaps="always"
      >
        <View>
          <Text>message board</Text>
        </View>
      </ScrollView>
      <NavBar navigation={navigation} />
    </View>
  );
  //     {myErrands.length > 0 ? (
  //       myErrands.map((errand) => {
  //         return (
  //           <View key={errand.errandID} style={styles.listItem}>
  //             <View style={styles.titleField}>
  //               <Text style={{ fontSize: 22 }}>{errand.errandName}</Text>
  //             </View>
  //             <View style={styles.descriptionField}>
  //               <Text>{errand.description}</Text>
  //             </View>
  //             <View style={styles.requirementsField}>
  //               <Text>Helper Requirements: {errand.requirements}</Text>
  //             </View>
  //             <View style={styles.jobTypeField}>
  //               <Text>Job Type: {errand.workType}</Text>
  //             </View>
  //             <View style={styles.locationField}>
  //               <Text>Location: {errand.area}</Text>
  //             </View>
  //             <View style={styles.dateField}>
  //               <Text>Date: {errand.date}</Text>
  //             </View>
  //             <View style={styles.jobLengthField}>
  //               <Text>Job length: {errand.timeFrame}</Text>
  //             </View>
  //             {/* <View style={styles.jobLengthField}>
  //               <Text style={{ fontWeight: "bold" }}>Volunteers:</Text>
  //               {errand.chippers.map((chipper) => {
  //                 return (
  //                   <View key={chipper.id} style={styles.chipperList}>
  //                     <Text>{chipper.user}</Text>
  //                     <Pressable
  //                       disabled={false}
  //                       style={styles.kudosButton}
  //                       onPress={(e) => {
  //                         giveKudos(chipper.id);
  //                       }}
  //                     >
  //                       <Text>Give kudos!</Text>
  //                     </Pressable>
  //                   </View>
  //                 );
  //               })}
  //             </View> */}
  //             <View style={styles.buttonsFlexBox}>
  //               <Pressable
  //                 style={
  //                   completeButtonPressed
  //                     ? styles.completeButtonPressed
  //                     : styles.completeButton
  //                 }
  //                 onPressIn={() => setCompleteButtonPressed(true)}
  //                 onPressOut={() => {
  //                   setCompleteButtonPressed(false);
  //                   handleCompleteErrand(errand.errandID);
  //                 }}
  //               >
  //                 <Text>Completed</Text>
  //                 <MaterialIcons
  //                   name="done-outline"
  //                   size={18}
  //                   color="black"
  //                 />
  //               </Pressable>
  //               <Pressable
  //                 onPressIn={() => setEditButtonPressed(true)}
  //                 onPressOut={() => {
  //                   setEditButtonPressed(false);
  //                   handleEditErrand(errand.errandID);
  //                 }}
  //                 style={
  //                   editButtonPressed
  //                     ? styles.editButtonPressed
  //                     : styles.editButton
  //                 }
  //               >
  //                 <Text>Edit</Text>
  //                 <Feather name="edit" size={18} color="black" />
  //               </Pressable>
  //               <Pressable
  //                 style={
  //                   deleteButtonPressed
  //                     ? styles.deleteButtonPressedIn
  //                     : styles.deleteButton
  //                 }
  //                 onPressIn={() => setDeleteButtonPressed(true)}
  //                 onPressOut={() => {
  //                   setDeleteButtonPressed(false);
  //                   handleDeleteErrand(errand.errandID);
  //                 }}
  //               >
  //                 <Text>Delete</Text>
  //                 <MaterialIcons
  //                   name="delete-outline"
  //                   size={22}
  //                   color="black"
  //                 />
  //               </Pressable>
  //             </View>
  //             <View style={styles.messagesFlexbox}>
  //               <Pressable
  //                 onPressIn={() => setMessagesButtonPressed(true)}
  //                 onPressOut={() => {
  //                   setMessagesButtonPressed(false);
  //                   handleMessagesErrand(errand.errandID);
  //                 }}
  //                 style={
  //                   messagesButtonPressed
  //                     ? styles.messagesButtonPressed
  //                     : styles.messagesButton
  //                 }
  //               >
  //                 <Text>Messages </Text>
  //                 <Feather name="message-circle" size={18} color="black" />
  //               </Pressable>
  //             </View>
  //           </View>
  //         );
  //       })
  //     ) : (
  //       <View style={styles.noErrandsPage}>
  //         <View style={styles.noErrandsBubble}>
  //           <Text style={{ textAlign: "center" }}>
  //             You don't have any errands yet, if you need some help go and add
  //             a new one! 📝
  //           </Text>
  //         </View>
  //       </View>
  //     )}
}

const styles = StyleSheet.create({
  pageContent: {
    flexGrow: 1,
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
    marginBottom: 5,
  },
  messagesFlexbox: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  completeButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#48e582b7",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 125,
    padding: 5,
  },
  completeButtonPressed: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#339457",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 125,
    padding: 5,
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
  editButtonPressed: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgb(49, 151, 125)",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 110,
    padding: 5,
  },
  messagesButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(86, 232, 195, 0.7)",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 350,
    padding: 5,
  },
  messagesButtonPressed: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(49, 151, 125)",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 350,
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
  deleteButtonPressedIn: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgba(149, 37, 37, 1)",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 100,
    padding: 5,
  },
  chipperList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  kudosButton: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    width: 80,
    backgroundColor: "beige",
  },
  noErrandsPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noErrandsBubble: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    margin: 10,
    borderWidth: 0.5,
    borderColor: "gray",
  },
});
