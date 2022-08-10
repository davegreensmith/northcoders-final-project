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
import { useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";

export default function AddErrandScreen({ navigation }) {
  const [timeFrame, setTimeFrame] = useState("- Select -");
  const [workType, setWorkType] = useState("- Select -");

  return (
    <View style={{flex: 1}}>
      <Header />
      <ScrollView contentContainerStyle={styles.pageView}>
        <Text
          style={{
            marginLeft: 8,
            marginBottom: 10,
            marginTop: 10,
            fontSize: 16,
          }}
        >
          What is it you would like help with?
        </Text>
        <TextInput style={styles.titleField} placeholder="Errand Title" />
        <TextInput
          multiline={true}
          style={styles.descriptionField}
          placeholder="Description of the work you need help with..."
        />
        <TextInput
          style={styles.genericInputField}
          placeholder="Requirements (optional)"
        />
        <TextInput
          style={styles.genericInputField}
          placeholder="Location for the errand"
        />
        <TextInput
          style={styles.genericInputField}
          placeholder="Date (Format: August 9, 2022 at 12:00:00 AM UTC+1)"
        />
        <View style={styles.dropdownFlexTime}>
          <Picker
            style={styles.dropdownMenu}
            itemStyle={{ fontSize: 16 }}
            selectedValue={timeFrame}
            prompt={"How long will it take?"}
            onValueChange={(itemValue) => {
              setTimeFrame(itemValue);
            }}
          >
            <Picker.Item label="- Select -" value={0} />
            <Picker.Item label="Less than half an hour" value={0.5} />
            <Picker.Item label="Around an hour" value={1} />
            <Picker.Item label="A couple of hours" value={2} />
            <Picker.Item label="A few hours" value={3} />
            <Picker.Item label="Half a working day" value={4} />
            <Picker.Item label="A full day's work" value={8} />
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
        <View style={styles.dropdownFlexWorkType}>
          <Picker
            style={styles.dropdownMenu}
            itemStyle={{ fontSize: 16 }}
            selectedValue={workType}
            prompt={"Pick the most relevant type"}
            onValueChange={(itemValue) => {
              setWorkType(itemValue);
            }}
          >
            <Picker.Item label="- Select -" value={"none"} />
            <Picker.Item label="Heavy Lifting" value={"heavy lifting"} />
            <Picker.Item label="Gardening" value={"gardening"} />
            <Picker.Item label="Shopping" value={"shopping"} />
            <Picker.Item label="Transportation" value={"transportation"} />
            <Picker.Item label="Entertainment" value={"entertainment"} />
            <Picker.Item label="Charity" value={"charity"} />
            <Picker.Item label="Dog Walking" value={"dog walking"} />
            <Picker.Item label="Construction" value={"construction"} />
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
        <View style={styles.submitButtonFlex}>
          <Pressable style={styles.submitButton}>
            <Text style={{ textAlign: "center", fontSize: 16 }}>
              Create Errand
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageView: {
    marginTop: 15,
  },
  genericInputField: {
    backgroundColor: "#FFF",
    borderWidth: 0.4,
    borderRadius: 5,
    width: Platform.OS === "android" ? 375 : 355,
    height: 35,
    margin: 8,
    textAlign: "left",
    padding: 5,
    fontSize: 15,
  },
  titleField: {
    backgroundColor: "#FFF",
    borderWidth: 0.4,
    borderRadius: 5,
    width: Platform.OS === "android" ? 250 : 225,
    height: 35,
    margin: 8,
    textAlign: "left",
    padding: 5,
    fontSize: 15,
  },
  dropdownFlexTime: {
    flexDirection: Platform.OS === "android" ? "row" : "column-reverse",
    alignItems: "center",
    marginBottom: Platform.OS === "android" ? 10 : 0,
    marginTop: Platform.OS === "android" ? 10 : 25,
  },
  dropdownFlexWorkType: {
    flexDirection: Platform.OS === "android" ? "row" : "column-reverse",
    alignItems: "center",
    marginBottom: 10,
    marginTop: Platform.OS === "android" ? 10 : 0,
  },
  dropdownMenu: {
    backgroundColor: Platform.OS === "android" ? "#FFF" : "#0000",
    width: Platform.OS === "android" ? 200 : "70%",
    marginLeft: Platform.OS === "android" ? 9 : 0,
  },
  descriptionField: {
    backgroundColor: "#FFF",
    borderWidth: 0.4,
    borderRadius: 5,
    width: Platform.OS === "android" ? 375 : 355,
    height: 80,
    margin: 8,
    textAlign: "left",
    textAlignVertical: "top",
    flexWrap: "wrap",
    padding: 5,
    fontSize: 15,
  },
  submitButtonFlex: {
    flex: 1,
    flexDirection: "row",
    justifyContent: Platform.OS === "android" ? "flex-start" : "center",
    marginTop: Platform.OS === "android" ? 40 : 0,
    marginBottom: Platform.OS === "android" ? 0 : 150,
  },
  submitButton: {
    backgroundColor: "#47c9af",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    width: Platform.OS === "android" ? 125 : 150,
    margin: 10,
    padding: 10,
  },
});
