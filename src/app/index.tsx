import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HelloWorld from "@/components/HelloWorld";
import Icons from "@icons";
import { SendIcon } from "@icons";
import { Link } from "expo-router";
import ScanCamera from "@/components/ScanCamera";
import { ThemeProvider } from "../components/ThemeContext";

const App = () => {
  return (
    <View style={styles.container}>
      <ScanCamera />

      <HelloWorld />

      {/*Two ways of using the same component*/}
      <Icons.Send />
      <SendIcon />
      <StatusBar style="auto" />

      {/*Link that navigates to /settings*/}
      <Link href="/settings">Settings</Link>
    </View>
  );
};
export default () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
