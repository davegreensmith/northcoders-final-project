import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, Image, Text, View, Pressable, ScrollView, Dimensions } from 'react-native';
import MapView, { Callout, Circle, Marker } from 'react-native-maps';
import Header from './Header';
import NavBar from './NavBar';
import { fetchLatLongs } from '../firebase/config.js';

export default function MapScreen({ navigation }) {
  const [latLongArray, setLatLongArray] = useState(false);
  function handleGiveHelpPress() {
    navigation.navigate('Map');
  }

  useEffect(() => {
    fetchLatLongs()
      .then(({ latLongs }) => {
        console.log(latLongs, '<<< latlongs in SpikeMaps');
        // setLatLongArray(latLongs);
        setLatLongArray([...latLongs]);
        // latLongArray = [...latLongs];
        console.log(latLongArray, '<<< lat long array');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View>
      <Header />
      <View contentContainerStyle={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 53.2587,
            longitude: -2.1193,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: 53.2587,
              longitude: -2.1193,
            }}
          >
            <Callout>
              <Text>This is Macc</Text>
            </Callout>
          </Marker>
          <Circle
            center={{
              latitude: 53.2587,
              longitude: -2.1193,
            }}
            radius={2000}
            fillColor={'rgba(27.8, 78.8, 68.6, 0.3)'}
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
                  key={errand.errandId}
                >
                  <Callout>
                    <Text>{errand.errandId}</Text>
                  </Callout>
                </Marker>
              );
            })
          ) : (
            //   <Marker
            //   coordinate={{
            //     latitude: 53.2587,
            //     longitude: -2.1193,
            //   }}
            // >
            //   <Callout>
            //     <Text>This is Macc</Text>
            //   </Callout>
            // </Marker>
            <></>
          )}
        </MapView>
      </View>
      <NavBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  volunteerButton: {
    backgroundColor: '#47c9af',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    width: 270,
    margin: 20,
    padding: 10,
    marginBottom: 90,
  },
  helpButton: {
    backgroundColor: '#47c9af',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    width: 270,
    height: 100,
    margin: 20,
    padding: 10,
    marginTop: 20,
    textAlignVertical: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
  },
  map: { height: Dimensions.get('window').height, width: Dimensions.get('window').width },
});
