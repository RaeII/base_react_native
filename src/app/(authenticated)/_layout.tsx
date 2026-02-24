import { Redirect, Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "@/shared/contexts/AuthContext";
import { Sidebar } from "@/shared/components/Sidebar";

/**
 * Layout guard para rotas autenticadas.
 *
 * Verifica se o usuário está autenticado antes de permitir
 * acesso às rotas filhas. Redireciona para login se não estiver.
 */
export default function AuthenticatedLayout() {
  const { user, loading } = useAuth();

  // Exibe loading enquanto verifica autenticação
  if (loading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    );
  }

  // Redireciona para login se não autenticado
  if (!user) {
    return <Redirect href="/(auth)/Login" />;
  }

  return (
    <View className="flex-1 flex-row bg-background">
      <Sidebar />
      <View className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "transparent",
            },
          }}
        />
      </View>
    </View>
  );
}
