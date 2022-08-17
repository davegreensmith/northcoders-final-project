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
import {
  fetchErrandByErrandID,
  getUsername,
  updateErrand,
  addChipperToErrand,
} from "../firebase/config";

export default function SingleErrandScreen({ route, navigation }) {
  const { id } = route.params;

  const [singleErrand, setSingleErrand] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasChippedIn, setHasChippedIn] = useState(false);

  const [submitButtonPressed, setSubmitButtonPressed] = useState(false);

  function handleChipIn() {
    addChipperToErrand(id);
    setHasChippedIn(true);
  }

  useEffect(() => {
    fetchErrandByErrandID(id).then((errandData) => {
      return getUsername().then((username) => {
        const user = username.user;
        errandData.chippers.forEach((chipper) => {
          if (chipper.user === user) {
            setHasChippedIn(true);
          }
        });
        setSingleErrand({ ...errandData });
        setIsLoading(false);
      });
    });
  }, [hasChippedIn, singleErrand]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={navigation} />
        <View style={styles.pageContent}>
          <View style={styles.titleHeader}>
            <View style={styles.titleHeaderText}>
              <View>
                <Text style={{ fontSize: 26 }}>{singleErrand.errandName}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 20, color: "gray" }}>
                  {singleErrand.area}
                </Text>
              </View>
            </View>
            <View style={styles.avatarFlexBox}>
              <Text style={{ fontSize: 11 }}>{singleErrand.author}</Text>
            </View>
          </View>
          <View style={styles.dividerLine}></View>
          <View style={styles.errandInfo}>
            <View style={styles.subtitleFlexBox}>
              <Text style={styles.subtitle}>📝 Info</Text>
              <View style={styles.subtitleDividerLine}></View>
              <Text style={styles.description}>{singleErrand.description}</Text>
            </View>
            <View style={styles.dateAndTimeFlexBox}>
              <Text style={styles.subtitle}>📅 Schedule</Text>
              <View style={styles.subtitleDividerLine}></View>
              <Text style={styles.description}>
                Scheduled for {singleErrand.date}
              </Text>
              <Text style={styles.description}>
                {singleErrand.timeFrame} hours work time
              </Text>
            </View>
            {singleErrand.requirements ? (
              <View style={styles.requirementsFlexBox}>
                <Text style={styles.subtitle}>🧰 Good-To-Have's</Text>
                <View style={styles.subtitleDividerLine}></View>
                <Text style={styles.description}>
                  {singleErrand.requirements}
                </Text>
              </View>
            ) : (
              <></>
            )}
            <View style={styles.categoryFlexBox}>
              <Text style={styles.subtitle}>💪 Activity</Text>
              <View style={styles.subtitleDividerLine}></View>
              <Text style={styles.description}>{singleErrand.workType}</Text>
            </View>
            <View style={styles.chippersFlexBox}>
              <Text style={styles.subtitle}>🙋 Fellow Chippers</Text>
              <View style={styles.subtitleDividerLine}></View>
              {singleErrand.chippers.length === 1 ? (
                <Text style={styles.description}>
                  {singleErrand.chippers.length} other person is currently
                  chipping in on this errand
                </Text>
              ) : (
                <Text style={styles.description}>
                  {singleErrand.chippers.length} other people are currently
                  chipping in on this errand
                </Text>
              )}
            </View>
          </View>
          {hasChippedIn ? (
            <View style={styles.buttonFlexBox}>
              <Text>You've Chipped In!</Text>
            </View>
          ) : (
            <View style={styles.buttonFlexBox}>
              <Pressable
                style={
                  submitButtonPressed
                    ? styles.chipInButtonPressed
                    : styles.chipInButton
                }
                onPress={handleChipIn}
                onPressIn={() => {
                  setSubmitButtonPressed(true);
                }}
                onPressOut={() => {
                  setSubmitButtonPressed(false);
                }}
              >
                <Text style={{ textAlign: "center", fontSize: 16 }}>
                  Chip In
                </Text>
              </Pressable>
            </View>
          )}
        </View>
        <NavBar navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
    alignItems: "center",
  },
  titleHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  titleHeaderText: {
    justifyContent: "space-around",
    flex: 0.66,
    marginLeft: 25,
  },
  avatarFlexBox: {
    flex: 0.33,
    alignItems: "center",
  },
  avatar: {
    borderRadius: 100,
  },
  dividerLine: {
    borderBottomWidth: 2,
    marginTop: 5,
    width: "90%",
  },
  errandInfo: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "gray",
    width: "90%",
    marginTop: 20,
    padding: 10,
  },
  subtitleFlexBox: {
    flex: 1,
    width: "90%",
    marginTop: 5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  subtitleDividerLine: {
    borderWidth: 0.7,
    marginTop: 5,
  },
  description: {
    marginTop: 5,
    marginLeft: 28,
    color: "gray",
  },
  dateAndTimeFlexBox: {
    flex: 1,
    width: "90%",
    marginTop: 5,
  },
  requirementsFlexBox: {
    flex: 1,
    width: "90%",
    marginTop: 5,
  },
  categoryFlexBox: {
    flex: 1,
    width: "90%",
    marginTop: 5,
  },
  chippersFlexBox: {
    flex: 1,
    width: "90%",
    marginTop: 5,
    marginBottom: 5,
  },
  buttonFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    height: 80,
  },
  chipInButton: {
    backgroundColor: "#47c9af",
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    padding: 10,
  },
  chipInButtonPressed: {
    backgroundColor: "#357568",
    borderWidth: 1,
    borderRadius: 5,
    width: 100,
    margin: 30,
    padding: 10,
  },
});
