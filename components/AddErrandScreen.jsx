import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import {
  addErrand,
  addErrandToUser,
  addLatLong,
  getUserInfo,
  getUsername,
  updateLatLong,
  updateErrand,
  addMessage,
  updateMessagePropertyByMessageID,
} from "../firebase/config";
import { convertLocationToLatLong } from "../utils/api";

export default function AddErrandScreen({ navigation }) {
  const [defaultLocation, setDefaultLocation] = useState(null);
  const [timeFrame, setTimeFrame] = useState("- Select -");
  const [workType, setWorkType] = useState("- Select -");
  const [errandName, setErrandName] = useState(null);
  const [description, setDescription] = useState(null);
  const [requirements, setRequirements] = useState("");
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(null);

  const [error, setError] = useState(false);

  const [submitButtonPressed, setSubmitButtonPressed] = useState(false);

  function handleAddErrand() {
    if (
      !errandName ||
      !description ||
      !location ||
      !date ||
      timeFrame === "- Select -" ||
      workType === "- Select -"
    ) {
      setError("Information missing. Please fill in all required fields");
    } else {
      return convertLocationToLatLong(location)
        .then(({ longLatData }) => {
          return Promise.all([getUsername(), longLatData]);
        })
        .then(([{ user, id }, longLatData]) => {
          const messageDetails = {
            body: [],
            chippers: [],
            errandName,
            errandOwner: { id, username: user },
          };
          return Promise.all([
            addMessage(messageDetails),
            { user, id },
            longLatData,
          ]);
        })
        .then(([{ messageID, messageUserId }, { user, id }, longLatData]) => {
          const errandDetails = {
            ...longLatData,
            timeFrame,
            workType,
            errandName,
            description,
            requirements,
            location,
            date,
            author: user,
            authorId: id,
            chippers: [],
            messageID,
          };
          return errandDetails;
        })
        .then((errand) => {
          return Promise.all([addErrand(errand), errand]);
        })
        .then(([{ errandID, errandUserId }, errand]) => {
          const { messageID } = errand;
          const messageBody = { errandID };
          updateMessagePropertyByMessageID(messageID, messageBody);
          addErrandToUser(errandID, errandUserId);
          return Promise.all([
            convertLocationToLatLong(errand.location),
            errandID,
            errand,
          ]).then(
            ([{ longLatData }, errandID, { author, date, errandName }]) => {
              const body = {
                ...longLatData,
                errandID,
                author,
                date,
                errandName,
              };

              return Promise.all([addLatLong(body), errandID]).then(
                ([{ latLongID }, errandID]) => {
                  const body = { latLongID };
                  updateErrand(errandID, body);
                  navigation.navigate("Splash");
                }
              );
            }
          );
        })
        .catch((err) => {
          console.log(err);
          if (err.message === "Request failed with status code 404")
            setError("Invalid postcode, please check and try again");
        });
    }
  }

  useEffect(() => {
    getUserInfo().then(({ userData }) => {
      setDefaultLocation(userData.location);
    });
  });

  return (
    <View style={{ flex: 1, backgroundColor: "rgb(248, 248, 247)" }}>
      <Header navigation={navigation} />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraScrollHeight={75}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.pageContent}>
          <Text
            style={{
              marginLeft: 8,
              marginBottom: 10,
              marginTop: 10,
              fontSize: 18,
            }}
          >
            What is it you would like help with?
          </Text>
          <Text style={styles.requiredText}>* required fields</Text>
          <TextInput
            style={styles.titleField}
            onChangeText={setErrandName}
            value={errandName}
            placeholder="* Errand Title"
          />
          <TextInput
            multiline={true}
            style={styles.descriptionField}
            onChangeText={setDescription}
            value={description}
            placeholder="* Description of the work you need help with, give as much detail as possible..."
          />
          <TextInput
            style={styles.genericInputField}
            onChangeText={setRequirements}
            value={requirements}
            placeholder=" Volunteer Requirements (optional)"
          />
          <TextInput
            style={styles.genericInputField}
            onChangeText={setLocation}
            value={location}
            placeholder={"* Post code of errand"}
          />
          <TextInput
            style={styles.genericInputField}
            onChangeText={setDate}
            value={date}
            placeholder="* Errand Date (DD/MM/YYYY)"
          />
          <View style={styles.dropDownFlex}>
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
            <Text
              style={{
                fontSize: Platform.OS === "android" ? 20 : 16,
                flex: 1,
                marginLeft: 10,
              }}
            >
              How long will it take?
            </Text>
          </View>
          <View style={styles.dropDownFlex}>
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
            <Text
              style={{
                fontSize: Platform.OS === "android" ? 20 : 16,
                flex: 1,
                marginLeft: 10,
              }}
            >
              What type of work is involved?
            </Text>
          </View>
          {error ? (
            <View style={styles.errorText}>
              <Text style={{ color: "red" }}>{error}</Text>
            </View>
          ) : (
            <View style={styles.errorText}>
              <Text style={{ color: "rgba(0, 0, 0, 0)" }}>
                This is placeholder text
              </Text>
            </View>
          )}
          <View style={styles.submitButtonFlex}>
            <Pressable
              style={
                submitButtonPressed
                  ? styles.submitButtonPressed
                  : styles.submitButton
              }
              onPress={handleAddErrand}
              onPressIn={() => {
                setSubmitButtonPressed(true);
              }}
              onPressOut={() => {
                setSubmitButtonPressed(false);
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 16 }}>
                Create Errand
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flexGrow: 1,
  },
  genericInputField: {
    backgroundColor: "#FFF",
    borderWidth: 0.4,
    borderRadius: 5,
    width: "90%",
    height: 35,
    marginTop: 10,
    marginHorizontal: 20,
    textAlign: "left",
    padding: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#4faf9c",
  },
  titleField: {
    backgroundColor: "#FFF",
    borderWidth: 0.4,
    borderRadius: 5,
    width: "55%",
    height: 35,
    marginTop: 5,
    marginHorizontal: 20,
    textAlign: "left",
    padding: 5,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#4faf9c",
  },
  dropDownFlex: {
    backgroundColor: "white",
    paddingTop: 5,
    borderRadius: 8,
    width: "90%",
    flexDirection:
      Platform.OS === "android" ? "column-reverse" : "column-reverse",
    alignItems: "flex-start",
    marginTop: 10,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: "#4faf9c",
  },
  dropdownMenu: {
    margin: 3,
    backgroundColor: Platform.OS === "android" ? "#FFF" : "#0000",
    width: Platform.OS === "android" ? 200 : "70%",
    marginLeft: Platform.OS === "android" ? 9 : 0,
  },
  descriptionField: {
    backgroundColor: "#FFF",
    borderWidth: 0.4,
    borderRadius: 5,
    width: "90%",
    height: 80,
    marginTop: 10,
    marginHorizontal: 20,
    textAlign: "left",
    textAlignVertical: "top",
    flexWrap: "wrap",
    padding: 5,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#4faf9c",
  },
  submitButtonFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#47c9af",
    borderWidth: 1,
    borderRadius: 5,
    width: Platform.OS === "android" ? 125 : 150,
    padding: 10,
  },
  submitButtonPressed: {
    backgroundColor: "#357568",
    borderWidth: 1,
    borderRadius: 5,
    width: Platform.OS === "android" ? 125 : 150,
    marginBottom: 30,
    padding: 10,
  },
  requiredText: {
    marginVertical: 5,
    marginLeft: 20,

    fontSize: 12,
  },
  errorText: {
    alignItems: "center",
    marginBottom: 8,
  },
});
