import { View, Text } from "react-native";
import { useAuth } from "@/shared/contexts/AuthContext";
import { Button } from "@/shared/components/ui/Button";

/**
 * Página inicial da área autenticada.
 * Exibe dados do usuário logado e opção de logout.
 */
export default function AuthenticatedHome() {
  const { user, logout } = useAuth();

  return (
    <View className="flex-1 bg-background px-6 justify-center items-center">
      {/* Saudação */}
      <View className="items-center mb-8">
        <Text className="text-3xl font-bold text-foreground">
          Bem-vindo, {user?.username}!
        </Text>
        <Text className="text-base text-muted-foreground mt-2">
          Você está autenticado no sistema
        </Text>
      </View>

      {/* Dados do Usuário */}
      <View className="w-full max-w-md bg-card rounded-2xl p-6 border border-border mb-8">
        <Text className="text-lg font-semibold text-foreground mb-4">
          Seus dados
        </Text>

        <View className="gap-3">
          <View className="flex-row justify-between">
            <Text className="text-muted-foreground">ID</Text>
            <Text className="text-foreground font-medium">{user?.id}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-muted-foreground">Usuário</Text>
            <Text className="text-foreground font-medium">{user?.username}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-muted-foreground">E-mail</Text>
            <Text className="text-foreground font-medium">
              {user?.email ?? "Não informado"}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-muted-foreground">Admin</Text>
            <Text className="text-foreground font-medium">
              {user?.is_admin ? "Sim" : "Não"}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-muted-foreground">Status</Text>
            <Text className="text-foreground font-medium">
              {user?.is_active ? "Ativo" : "Inativo"}
            </Text>
          </View>
        </View>
      </View>

      {/* Botão Logout */}
      <View className="w-full max-w-md">
        <Button
          label="Sair"
          size="lg"
          variant="destructive"
          onPress={logout}
          className="w-full"
        />
      </View>
    </View>
  );
}
