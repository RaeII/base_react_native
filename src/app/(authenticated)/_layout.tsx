import { Redirect, Stack } from "expo-router";
import { View, ActivityIndicator, Platform } from "react-native";
import { useAuth } from "@/shared/contexts/AuthContext";
import { Sidebar } from "@/shared/components/Sidebar";
import { BottomTabBar } from "@/shared/components/BottomTabBar";

/**
 * Layout guard para rotas autenticadas.
 *
 * Verifica se o usuário está autenticado antes de permitir
 * acesso às rotas filhas. Redireciona para login se não estiver.
 */
export default function AuthenticatedLayout() {
  const { user, loading } = useAuth();
  const isWeb = Platform.OS === "web";

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
    <View className="flex-1 bg-background">
      <View className="flex-1 flex-row">
        {isWeb ? <Sidebar /> : null}
        <View className={isWeb ? "flex-1" : "flex-1 pb-24"}>
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

      {!isWeb ? <BottomTabBar /> : null}
    </View>
  );
}
