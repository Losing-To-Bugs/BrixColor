import {LinkProps} from "expo-router/build/link/Link";
import {Link} from "expo-router";
import {TouchableOpacity} from "react-native";

export function BrixDrawerItem(props: LinkProps) {
    return <Link href={props.href} asChild>
        <TouchableOpacity style={{padding: 16}}>
            {props.children}
        </TouchableOpacity>
    </Link>;
}