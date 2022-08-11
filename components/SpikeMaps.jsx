import { StyleSheet, TextInput, Image, Text, View, Pressable, ScrollView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import Header from './Header';
import NavBar from './NavBar';

export default function MapScreen({ navigation }) {
  function handleGiveHelpPress() {
    navigation.navigate('Map');
  }

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
        />
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
