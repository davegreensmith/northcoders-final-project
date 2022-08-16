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
import {
  deleteErrand,
  deleteLatLongByErrandId,
  fetchErrandByErrandID,
  getUserInfo,
  loggedInUserId,
  updateUserErrandList,
} from "../firebase/config";

export default function MyErrandsScreen({ navigation }) {
  const [myErrands, setMyErrands] = useState([]);
  const [refreshPage, setRefreshPage] = useState(true);

  function handleEditErrand(errandID) {
    fetchErrandByErrandID(errandID).then((errandData) => {
      console.log(errandData, "errand data in MyErrandsScreen edit button");
    });
  }

  function handleDeleteErrand(errandID) {
    return Promise.all([deleteLatLongByErrandId(errandID), errandID]).then(
      ([undefined, errandID]) => {
        return deleteErrand(errandID).then(([undefined, errandID, userId]) => {
          return Promise.all([getUserInfo(), errandID, userId]).then(
            ([{ userData }, errandID, userId]) => {
              const userErrands = userData.errands;
              const newErrandList = userErrands.filter((errand) => {
                return errand !== errandID;
              });
              const body = { errands: newErrandList };
              updateUserErrandList(userId, body).then(() => {
                setRefreshPage(!refreshPage);
              });
            }
          );
        });
      }
    );
    const errandsArray = [...myErrands];
    const newArray = errandsArray.filter((errand) => {
      return errand.id !== errandID;
    });
    setMyErrands(newArray);
  }

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
  }, [refreshPage]);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.pageContent}
        keyboardShouldPersistTaps="always"
      >
        {myErrands.length > 0 ? (
          myErrands.map((errand) => {
            return (
              <View key={errand.errandID} style={styles.listItem}>
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
                {/* <View style={styles.jobLengthField}>
                  <Text style={{ fontWeight: "bold" }}>Volunteers:</Text>
                  {errand.chippers.map((chipper) => {
                    return <Text>{chipper}</Text>;
                  })}
                </View> */}
                <View style={styles.buttonsFlexBox}>
                  <Pressable style={styles.completeButton}>
                    <Text>Completed</Text>
                    <MaterialIcons
                      name="done-outline"
                      size={18}
                      color="black"
                    />
                  </Pressable>
                  <Pressable
                    onPress={(e) => {
                      handleEditErrand(errand.errandID);
                    }}
                    style={styles.editButton}
                  >
                    <Text>Edit</Text>
                    <Feather name="edit" size={18} color="black" />
                  </Pressable>
                  <Pressable
                    onPress={(e) => {
                      handleDeleteErrand(errand.errandID);
                    }}
                    style={styles.deleteButton}
                  >
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
          })
        ) : (
          <View style={styles.noErrandsPage}>
            <View style={styles.noErrandsBubble}>
              <Text style={{ textAlign: "center" }}>
                You don't have any errands yet, if you need some help go and add
                a new one! 📝
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
