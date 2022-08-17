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
import { useEffect, useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  fetchErrandByErrandID,
  fetchMessagesByErrandID,
  fetchMessagesByMessageID,
  getUsername,
  postMessageByMessageID,
} from "../firebase/config";

export default function MessageBoard({ navigation, route }) {
  const [currentMessage, setCurrentMessage] = useState(false);
  const [currentErrand, setCurrentErrand] = useState(false);
  const [messagesArray, setMessagesArray] = useState([]);
  const [addMessage, setAddMessage] = useState("");
  const [fieldChanged, setFieldChanged] = useState(false);
  const [messagesButtonPressed, setMessagesButtonPressed] = useState(false);
  const [loggedInUsername, setLoggedInUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { errandID } = route.params;

  function handleSendMessage(message) {
    if (message === "") {
    } else {
      const body = { msgAuthor: loggedInUsername, message };
      const { messageID } = currentMessage;
      postMessageByMessageID(messageID, body);

      const messagesOnScreen = [...messagesArray];
      messagesOnScreen.push(body);
      setMessagesArray([...messagesOnScreen]);
    }
  }
  function clickAway(userID) {
    navigation.navigate("Another User", { userId: userID });
  }
  useEffect(() => {
    setIsLoading(true);
    fetchErrandByErrandID(errandID)
      .then((errandData) => {
        setCurrentErrand({ ...errandData });
        const messageID = errandData.messageID;
        fetchMessagesByMessageID(messageID).then((messageData) => {
          setCurrentMessage({ ...messageData });
          const messageBodyArr = [...messageData.body];
          setMessagesArray(messageBodyArr);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.log(error);
      });
    getUsername().then(({ user }) => {
      setLoggedInUserName(user);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.pageContent}
        enableOnAndroid={true}
      >
        <View key={currentErrand.errandID} style={styles.listItem}>
          <View style={styles.titleField}>
            <Text style={{ fontSize: 22 }}>{currentErrand.errandName}</Text>
          </View>
          <View style={styles.locationField}>
            <Text>Location: {currentErrand.area}</Text>
          </View>
          <View style={styles.dateField}>
            <Text>Date: {currentErrand.date}</Text>
          </View>
          {isLoading ? (
            <></>
          ) : (
            <View style={styles.chipperContainer}>
              <Text style={styles.chipperSubTitle}>Current Chippers:</Text>
              {currentErrand.chippers.map((chipper) => {
                return (
                  <View key={chipper.id}>
                    <Pressable
                      onPress={() => {
                        clickAway(chipper.id);
                      }}
                      style={{ fontSize: 11 }}
                    >
                      <Text style={styles.chipperUName}>{chipper.user}</Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          )}
          <View style={styles.buttonsFlexBox}></View>
        </View>
        <View style={styles.titleField}>
          <Text style={{ fontSize: 22 }}>Message board</Text>
        </View>
        {messagesArray.map((message) => {
          return (
            <View style={styles.message} key={message.messageID}>
              <Text style={{ fontSize: 11 }}>{message.msgAuthor}:</Text>
              <Text style={{ fontSize: 15 }}>{message.message}</Text>
            </View>
          );
        })}
        <View style={styles.changeAddMessage}>
          <TextInput
            value={addMessage}
            onChangeText={(newValue) => {
              setAddMessage(newValue);
              setFieldChanged(true);
            }}
            style={styles.editFieldValue}
            onFocus={() => {}}
          />
          <Pressable
            onPressIn={() => setMessagesButtonPressed(true)}
            onPressOut={() => {
              setMessagesButtonPressed(false);
              handleSendMessage(addMessage);
            }}
            style={
              messagesButtonPressed
                ? styles.messagesButtonPressed
                : styles.messagesButton
            }
          >
            <Feather name="send" size={18} color="black" />
          </Pressable>
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

  message: {
    justifyContent: "center",
    backgroundColor: "#fff",
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    padding: 10,
  },
  fieldLabel: {
    fontSize: Platform.OS === "android" ? 16 : 14,
    marginLeft: 15,
    flex: 1,
  },
  changeAddMessage: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 10,
    flex: 1,
    marginBottom: 10,
  },
  editFieldValue: {
    fontSize: Platform.OS === "android" ? 16 : 14,
    marginRight: 15,
    borderRadius: 10,
    padding: 8,
    width: 300,
    height: 40,
    borderColor: "#47c9af",
    borderWidth: 1,
    backgroundColor: "white",
    textAlign: "center",
  },
  listItem: {
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
  },
  titleField: {
    justifyContent: "center",

    padding: 5,
    paddingLeft: 15,
  },
  chipperContainer: {
    flexDirection: "row",
    justifyContent: "center",

    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    padding: 5,
  },
  chipperSubTitle: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    margin: 5,
  },
  chipperUName: {
    backgroundColor: "rgba(86, 232, 195, 0.7)",
    padding: 5,
    borderRadius: 5,
    margin: 5,
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
    width: 40,
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
    width: 40,
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
