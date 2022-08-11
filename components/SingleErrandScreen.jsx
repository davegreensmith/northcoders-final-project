import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import Header from "./Header";
import NavBar from "./NavBar";

export default function SingleErrandScreen() {
  return (
    <View>
      <Header />
      <View style={styles.pageContent}></View>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  pageContent: {
    flex: 1,
  },
});
