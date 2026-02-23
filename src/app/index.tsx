import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "@/shared/contexts/AuthContext";

/**
 * Rota raiz — redireciona com base no estado de autenticação.
 *
 * - Autenticado → (authenticated)
 * - Não autenticado → (auth)/Login
 */
export default function Index() {
  const { user, loading } = useAuth();

  // Exibe loading enquanto verifica autenticação
  if (loading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    );
  }

  // Redireciona baseado no estado de autenticação
  if (user) {
    return <Redirect href="/(authenticated)" />;
  }

  return <Redirect href="/(auth)/Login" />;
}
