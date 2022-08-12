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

  function handleGiveHelpPress() {
    navigation.navigate("Map");
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
  }, [usersLong]);

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>
        <View style={styles.radius}>
          <Text>Select your travel distance: </Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            dropDownContainerStyle={{ marginLeft: 10, width: 200 }}
            style={styles.dropdown}
          />
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
              return (
                <Marker
                  coordinate={{
                    latitude,
                    longitude,
                  }}
                  key={errand.errandID}
                >
                  <Callout style={styles.callout}>
                    <Text style={styles.heading}>{errand.errandName}</Text>
                    <Text style={styles.paragraph}>{errand.author}</Text>
                    <Text style={styles.date}>{errand.date}</Text>
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
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  radius: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    zIndex: "1",
  },
  dropdown: {
    marginLeft: 10,
    width: 200,
  },
  callout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 15,
    fontWeight: "bold",
  },
  paragraph: {
    textAlign: "center",
    // marginLeft: 10,
    marginTop: 5,
    fontSize: 14,
  },
  date: {
    textAlign: "center",
    // marginLeft: 10,
    marginTop: 5,
    fontSize: 14,
  },
});
