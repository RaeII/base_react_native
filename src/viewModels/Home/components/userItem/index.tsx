import { User } from "@/shared/types/user.types";
import { FC } from "react";
import { Text, View } from "react-native";

interface UserItemProps {
    user: User;
}

export const UserItem: FC<UserItemProps> = ({ user }) => {
    return <View className="w-full px-4 py-0 flex-row items-center gap-4 mb-4">
        <View>            
            <View>
                <Text className="text-foreground text-base font-bold">{user.username}</Text>
                <Text className="text-muted-foreground text-sm">{user.email}</Text>
            </View>
            <View>
                <Text className="text-muted-foreground text-sm">{user.is_active ? "Ativo" : "Inativo"}</Text>
                <Text className="text-muted-foreground text-sm">{user.is_admin ? "Admin" : "User"}</Text>
            </View>
            <Text className="text-muted-foreground text-sm">{user.last_login_at}</Text>
        </View>
    </View>
};