import { User } from "@/shared/types/user.types";
import { FC } from "react";
import { Text, View } from "react-native";

interface UserItemProps {
    user: User;
}

export const UserItem: FC<UserItemProps> = ({ user }) => {
  return (
    <View className="mb-3 rounded-2xl border border-border/60 px-4 py-3">
      <View className="web:flex-row web:items-center web:justify-between">
        <Text className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nome</Text>
        <Text className="mt-1 text-sm font-medium text-foreground web:mt-0">{user.username}</Text>
      </View>

      <View className="mt-3 web:flex-row web:items-center web:justify-between">
        <Text className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">E-mail</Text>
        <Text className="mt-1 text-sm font-medium text-foreground web:mt-0">{user.email}</Text>
      </View>

      <View className="mt-3 web:flex-row web:items-center web:justify-between">
        <Text className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Status</Text>
        <Text className="mt-1 text-sm font-medium text-foreground web:mt-0">
          {user.is_active ? "Ativo" : "Inativo"}
        </Text>
      </View>

      <View className="mt-3 web:flex-row web:items-center web:justify-between">
        <Text className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Perfil</Text>
        <Text className="mt-1 text-sm font-medium text-foreground web:mt-0">
          {user.is_admin ? "Admin" : "Usuario"}
        </Text>
      </View>

      <View className="mt-3 web:flex-row web:items-center web:justify-between">
        <Text className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Ultimo acesso
        </Text>
        <Text className="mt-1 text-sm font-medium text-foreground web:mt-0">{user.last_login_at}</Text>
      </View>
    </View>
  );
};