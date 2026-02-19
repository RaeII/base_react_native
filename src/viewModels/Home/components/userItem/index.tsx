import { User } from "@/shared/types/user.types";
import { FC } from "react";
import { Text, View } from "react-native";
import { styles } from "./style";

interface UserItemProps {
    user: User;
    key: number;
}

export const UserItem: FC<UserItemProps> = ({ user, key }) => {
    return <View style={styles.container} key={key}>
        <View>            
            <View>
                <Text style={styles.title}>{user.username}</Text>
                <Text style={styles.text}>{user.email}</Text>
            </View>
            <View>
                <Text style={styles.text}>{user.is_active ? "Ativo" : "Inativo"}</Text>
                <Text style={styles.text}>{user.is_admin ? "Admin" : "User"}</Text>
            </View>
            <Text style={styles.text}>{user.last_login_at}</Text>
        </View>
    </View>
};