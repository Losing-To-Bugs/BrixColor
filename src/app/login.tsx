import {View} from "react-native";
import {Link} from "expo-router";
import BrixText from "@/components/BrixText";
import pageStyles from "@/styles/page";

export default function Login() {
    return (<View style={pageStyles.container}>
        <Link href="/(drawer)/scan">
            <BrixText>Login</BrixText>
        </Link>
    </View>)
}