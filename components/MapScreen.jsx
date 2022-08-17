import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  Pressable,
  ScrollView,
  Dimensions,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import Header from "./Header";
import NavBar from "./NavBar";
import {
  fetchLatLongs,
  getUsername,
  getUsersLatLong,
} from "../firebase/config.js";

export default function MapScreen({ navigation }) {
  const [latLongArray, setLatLongArray] = useState(false);
  const [usersLong, setUsersLong] = useState(-2.1193);
  const [usersLat, setUsersLat] = useState(53.2587);

  //Radius picker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(800);
  const [items, setItems] = useState([
    { label: "0.5 miles", value: 800 },
    { label: "1 mile", value: 1600 },
    { label: "2 miles", value: 3200 },
    { label: "5 miles", value: 8000 },
    { label: "10 miles", value: 16000 },
  ]);
  // const [radius, setRadius] = useState(1000)

  function handleGoToErrand(id) {
    navigation.navigate("Single Errand", { id });
  }

  useEffect(() => {
    getUsersLatLong()
      .then((data) => {
        setUsersLong(data.longitude);
        setUsersLat(data.latitude);
      })
      .catch((err) => {
        console.log(err, "error in MapScreen.jsx");
      });

    fetchLatLongs()
      .then(({ latLongs }) => {
        setLatLongArray([...latLongs]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>
        <View style={styles.radius}>
          <Text style={{ fontSize: Platform.OS === "android" ? 14 : 13 }}>
            Select your travel distance:{" "}
          </Text>
          <View>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              dropDownContainerStyle={{
                width: Platform.OS === "android" ? 200 : 180,
              }}
              style={styles.dropdown}
            />
          </View>
        </View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: usersLat,
            longitude: usersLong,
            latitudeDelta: value / 30000,
            longitudeDelta: value / 30000,
          }}
          region={{
            latitude: usersLat,
            longitude: usersLong,
            latitudeDelta: value / 30000,
            longitudeDelta: value / 30000,
          }}
        >
          <Circle
            center={{
              latitude: usersLat,
              longitude: usersLong,
            }}
            radius={value}
            fillColor={"rgba(27.8, 78.8, 68.6, 0.3)"}
          ></Circle>

          {latLongArray ? (
            latLongArray.map((errand) => {
              const latitude = errand.latitude;
              const longitude = errand.longitude;
              const id = errand.errandID;

              return (
                <Marker
                  onCalloutPress={() => {
                    handleGoToErrand(id);
                  }}
                  coordinate={{
                    latitude,
                    longitude,
                  }}
                  key={errand.errandID}
                >
                  <Callout tooltip={true}>
                    <View>
                      <Pressable
                        style={styles.markerBubble}
                        onPress={() => {
                          handleGoToErrand(id);
                        }}
                      >
                        <Text style={styles.personAsking}>
                          {errand.author} wants help with
                        </Text>
                        <Text style={styles.heading}>
                          "{errand.errandName}"
                        </Text>
                        <Text style={styles.date}>on {errand.date}</Text>
                        <Text style={styles.viewDetails}>Find Out More...</Text>
                      </Pressable>
                      <View style={styles.arrow}></View>
                    </View>
                  </Callout>
                </Marker>
              );
            })
          ) : (
            <></>
          )}
        </MapView>
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  radius: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    zIndex: 1,
    backgroundColor: "#47c9af",
  },
  dropdown: {
    width: Platform.OS === "android" ? 200 : 180,
  },
  markerBubble: {
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "#47c9af",
    borderWidth: 4,
    borderRightWidth: 8,
    borderLeftWidth: 8,
    borderBottomWidth: 10,
    borderRadius: 30,
    padding: 15,
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 30,
    borderRightWidth: 30,
    borderTopWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#47c9af",
    alignSelf: "center",
  },
  heading: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },
  personAsking: {
    textAlign: "center",
    fontSize: 13,
  },
  date: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 14,
    color: "gray",
  },
  viewDetails: {
    marginTop: 5,
    color: "#4faf9c",
    textDecorationLine: "underline",
  },
});
