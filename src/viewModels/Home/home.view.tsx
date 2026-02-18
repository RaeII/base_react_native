import { Text, View } from "react-native";
import { FC } from "react";
import { useHomeModel } from "./home.model";

export const HomeView: FC<ReturnType<typeof useHomeModel>> = ({data}) => {
    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}