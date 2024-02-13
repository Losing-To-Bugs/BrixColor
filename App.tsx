import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HelloWorld from "@/components/HelloWorld";
import Icons from "@icons";
import {SendIcon} from "@icons"

export default function App() {
  return (
    <View style={styles.container}>
      <HelloWorld/>

      {/*Two ways of using the same component*/}
      <Icons.Send/>
      <SendIcon/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
