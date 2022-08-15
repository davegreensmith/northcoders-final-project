import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet
} from "react-native";
import { useState } from "react";
import Header from "./Header";
import NavBar from "./NavBar";

export default function MessageScreen({ navigation }) {
  
  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <View style={styles.pageContent}>
        <View style={styles.messageContainer}>
          <Text style={{ fontSize: 21 }}> You have no messages</Text>
        </View>
      </View>
      <NavBar navigation={navigation} />
      <View></View>
    </View>
  );
}


const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
    alignItems: "center"
  },
  messageContainer: {
    width: "85%",
    flex: 1,
    borderWidth: 2,
    borderRadius: 40,
    backgroundColor: "#FFF",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    margin: 30,
    justifyContent: "center",
    alignItems: "center"
  }
});