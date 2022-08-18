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
import { Picker } from "@react-native-picker/picker";
import {
  fetchErrandByErrandID,
  getUserInfo,
  loggedInUserId,
  getUsername,
  updateErrand,
} from "../firebase/config";

export default function EditErrandScreen({ route, navigation }) {
  const [errand, setMyErrand] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState("- Select -");
  const [workType, setWorkType] = useState("- Select -");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [date, setDate] = useState("");
  const [updated, setUpdated] = useState(false);

  const [submitButtonPressed, setSubmitButtonPressed] = useState(false);
  const [backButtonPressed, setBackButtonPressed] = useState(false);

  const { id } = route.params;

  function handleUpdateErrand(errandID) {
    const body = { timeFrame, workType, description, area, date };
    updateErrand(errandID, body);
    setUpdated(true);
  }

  useEffect(() => {
    fetchErrandByErrandID(id).then((errandData) => {
      const { description, area, date } = errandData;
      setDescription(description);
      setArea(area);
      setDate(date);
      const data = { ...errandData };
      setMyErrand(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={{ flex: 1, backgroundColor: "rgb(248, 248, 247)" }}>
        <Header navigation={navigation} />
        <ScrollView
          contentContainerStyle={styles.pageContent}
          keyboardShouldPersistTaps="handled"
        >
          <View key={errand.errandID} style={styles.listItem}>
            <View style={styles.titleField}>
              <Text style={{ fontSize: 22 }}>{errand.errandName}</Text>
            </View>
            <View style={styles.descriptionField}>
              <TextInput
                defaultValue={description}
                value={description}
                onChangeText={(newValue) => setDescription(newValue)}
              />
            </View>
            <View style={styles.locationField}>
              <TextInput
                defaultValue={area}
                value={area}
                onChangeText={(newValue) => setArea(newValue)}
              />
            </View>
            <View style={styles.dateField}>
              <TextInput
                defaultValue={date}
                value={date}
                onChangeText={(newValue) => setDate(newValue)}
              />
            </View>
            <View style={styles.dropdown}>
              <Text
                style={{
                  fontSize: Platform.OS === "android" ? 20 : 16,
                  flex: 1,
                  marginLeft: 10,
                }}
              >
                How long will it take?
              </Text>
              <Picker
                style={styles.dropdownMenu}
                itemStyle={{ fontSize: 16 }}
                selectedValue={timeFrame}
                prompt={"How long will it take?"}
                onValueChange={(itemValue) => {
                  setTimeFrame(itemValue);
                }}
              >
                <Picker.Item label="- Select -" value={""} />
                <Picker.Item
                  label="Less than half an hour"
                  value={"Less than half an hour"}
                />
                <Picker.Item label="Around an hour" value={"Around an hour"} />
                <Picker.Item
                  label="A couple of hours"
                  value={"A couple of hours"}
                />
                <Picker.Item label="A few hours" value={"A few hours"} />
                <Picker.Item
                  label="Half a working day"
                  value={"Half a working day"}
                />
                <Picker.Item
                  label="A full day's work"
                  value={"A full day's work"}
                />
              </Picker>
            </View>
            <View style={styles.dropdown}>
              <Text
                style={{
                  fontSize: Platform.OS === "android" ? 20 : 16,
                  flex: 1,
                  marginLeft: 10,
                }}
              >
                What type of work is involved?
              </Text>
              <Picker
                style={styles.dropdownMenu}
                itemStyle={{ fontSize: 16 }}
                selectedValue={workType}
                prompt={"Pick the most relevant type"}
                onValueChange={(itemValue) => {
                  setWorkType(itemValue);
                }}
              >
                <Picker.Item label="- Select -" value={"None"} />
                <Picker.Item label="Heavy Lifting" value={"Heavy Lifting"} />
                <Picker.Item label="Gardening" value={"Gardening"} />
                <Picker.Item label="Shopping" value={"Shopping"} />
                <Picker.Item label="Transportation" value={"Transportation"} />
                <Picker.Item label="Entertainment" value={"Entertainment"} />
                <Picker.Item label="Charity" value={"Charity"} />
                <Picker.Item label="Dog Walking" value={"Dog Walking"} />
                <Picker.Item label="Construction" value={"Construction"} />
                <Picker.Item label="Cleaning" value={"Cleaning"} />
                <Picker.Item label="Other" value={"Other"} />
              </Picker>
            </View>
            {updated ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                  marginTop: 15,
                }}
              >
                <Text>Errand updated!</Text>
              </View>
            ) : (
              <></>
            )}
            <View></View>
            <View style={styles.buttonsFlexBox}>
              <Pressable
                style={
                  submitButtonPressed
                    ? styles.completeButtonPressed
                    : styles.completeButton
                }
                defaultValue={errand.timeFrame}
                onPressIn={() => setSubmitButtonPressed(true)}
                onPressOut={() => {
                  setSubmitButtonPressed(false);
                  handleUpdateErrand(errand.errandID);
                }}
              >
                <Text>Submit changes</Text>
              </Pressable>
              <Pressable
                style={
                  backButtonPressed
                    ? styles.deleteButtonPressedIn
                    : styles.deleteButton
                }
                onPressIn={() => setBackButtonPressed(true)}
                onPressOut={() => {
                  setBackButtonPressed(false);
                  navigation.goBack();
                }}
              >
                <Text>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <NavBar navigation={navigation} />
      </View>
    );
  }
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
    borderWidth: 1,
    borderColor: "#4faf9c",
  },
  requirementsField: {
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#4faf9c",
  },
  jobTypeField: {
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#4faf9c",
  },
  locationField: {
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#4faf9c",
  },
  dateField: {
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#4faf9c",
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
  dropdown: {
    backgroundColor: "white",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#4faf9c",
  },
});
