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
import {
  createMessageAndAddIdToExistingErrands,
  fetchErrandByErrandID,
  fetchMessages,
  fetchMessagesByUserID,
  getUsername,
  updateMessageForErrandNames,
} from "../firebase/config";
import { useEffect, useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";
import { Feather } from "@expo/vector-icons";

export default function MessageBoard({ navigation }) {
  const [loggedInUser, setLoggedInUser] = useState();
  const [chipperMessages, setChipperMessages] = useState();
  const [errandOwnerMessages, setErrandOwnerMessages] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [messagesButtonPressed, setMessagesButtonPressed] = useState(false);
  const [refresh, setRefresh] = useState(true);

  function handleMessagesErrand(errandID) {
    navigation.navigate("MessageSingle", { errandID });
  }
  function handleRefresh() {
    setRefresh(!refresh);
  }
  useEffect(() => {
    setIsLoading(true);
    getUsername().then((username) => {
      setLoggedInUser(username);
      const userID = username.id;
      fetchMessagesByUserID(userID).then(
        ({ errandOwnerOf, errandChipperIn }) => {
          setChipperMessages(errandChipperIn);
          setErrandOwnerMessages(errandOwnerOf);
          setIsLoading(false);
        }
      );
    });
  }, [refresh]);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Header navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.pageContent}
        keyboardShouldPersistTaps="handled"
      >
        {isLoading ? (
          <Text>Loading message board</Text>
        ) : (
          <View>
            <View style={styles.headingContainer}>
              <Text style={styles.headerH1}>Messages from My Errands</Text>
              <Pressable
                // onPressIn={() => setMessagesButtonPressed(true)}
                onPressOut={() => {
                  handleRefresh();
                }}
                style={styles.refreshButton}
              >
                <Text>Refresh </Text>
                <Feather name="refresh-cw" size={18} color="black" />
              </Pressable>
            </View>
            {errandOwnerMessages.map((message) => {
              return (
                <View key={message.id} style={styles.messageInfo}>
                  <View style={styles.summaryContainer}>
                    <Text style={styles.errandTitle}>{message.errandName}</Text>
                    {message.body.length === 1 ? (
                      <Text>There is {message.body.length} message</Text>
                    ) : (
                      <Text>There are {message.body.length} messages</Text>
                    )}
                  </View>
                  <Pressable
                    // onPressIn={() => setMessagesButtonPressed(true)}
                    onPressOut={() => {
                      setMessagesButtonPressed(false);
                      handleMessagesErrand(message.errandID);
                    }}
                    style={
                      messagesButtonPressed
                        ? styles.messagesButtonPressed
                        : styles.messagesButton
                    }
                  >
                    <Text>Messages </Text>
                    <Feather name="message-circle" size={18} color="black" />
                  </Pressable>
                </View>
              );
            })}
            <Text style={styles.headerH1}>Messages from My ChipIns</Text>
            {chipperMessages.map((message) => {
              return (
                <View key={message.id} style={styles.messageInfo}>
                  <View style={styles.summaryContainer}>
                    <Text style={styles.errandTitle}>{message.errandName}</Text>
                    {message.body.length === 1 ? (
                      <Text>There is {message.body.length} message</Text>
                    ) : (
                      <Text>There are {message.body.length} messages</Text>
                    )}
                  </View>
                  <Pressable
                    // onPressIn={() => setMessagesButtonPressed(true)}
                    onPressOut={() => {
                      setMessagesButtonPressed(false);
                      handleMessagesErrand(message.errandID);
                    }}
                    style={
                      messagesButtonPressed
                        ? styles.messagesButtonPressed
                        : styles.messagesButton
                    }
                  >
                    <Text>Messages </Text>
                    <Feather name="message-circle" size={18} color="black" />
                  </Pressable>
                </View>
              );
            })}
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
  headingContainer: {
    flexDirection: "row",
  },
  refreshButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#47C9AF",
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    width: 100,
    padding: 5,
    margin: 5,
  },
  headerH1: {
    fontSize: 17,
    borderBottomWidth: 2,
    margin: 10,
  },
  errandTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  listItem: {
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
  },
  messageInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    backgroundColor: "#fff",
    width: 350,
    height: 65,
    margin: 5,
    borderWidth: 1,
    borderColor: "#4faf9c",
    borderRadius: 5,
  },
  summaryContainer: {
    width: 200,
  },
  descriptionField: {
    justifyContent: "center",
    backgroundColor: "#fff",
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
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
    backgroundColor: "#FFFAF0",
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    width: 100,
    padding: 5,
  },
  messagesButtonPressed: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(49, 151, 125)",
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    width: 100,
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
