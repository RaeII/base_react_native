import { Redirect, Stack, usePathname } from "expo-router";
import { View, ActivityIndicator, Platform, useWindowDimensions } from "react-native";
import { useColorScheme, vars } from "nativewind";
import { useAuth } from "@/shared/contexts/AuthContext";
import { Sidebar } from "@/shared/components/Sidebar";
import { BottomTabBar } from "@/shared/components/BottomTabBar";
import { AuthenticatedHeader } from "@/shared/components/AuthenticatedHeader";
import { getThemeTokens } from "@/shared/styles/theme";

/**
 * Layout guard para rotas autenticadas.
 *
 * Verifica se o usuário está autenticado antes de permitir
 * acesso às rotas filhas. Redireciona para login se não estiver.
 */
export default function AuthenticatedLayout() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const { colorScheme } = useColorScheme();
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const isDarkMode = colorScheme === "dark";
  const themeVars = vars(getThemeTokens(isDarkMode));
  const maxContentWidth = 1536;
  const isLargeScreen = width >= 1024;
  const useSidebar = isWeb && width >= 1024;
  const pathnamesWithoutNav = ["a"];
  const shouldShowNav = !pathnamesWithoutNav.some((path) => pathname?.startsWith(path));
  const noShowHeaderPaths = [""];
  const noShowHeader = noShowHeaderPaths.some((path) => pathname?.startsWith(path));

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
    <View className="flex-1 bg-shell" style={themeVars}>
      <View className="flex-1" style={{ flexDirection: useSidebar ? "row" : "column" }}>
        {useSidebar && shouldShowNav ? <Sidebar /> : null}
        <View className="flex-1">
          <View
            className={`flex-1 w-full self-center ${
              isLargeScreen
                ? "my-4 overflow-hidden rounded-3xl border border-border/70 shadow-sm bg-background"
                : ""
            }`}
            style={isLargeScreen ? { maxWidth: maxContentWidth } : undefined}
          >
            {isWeb && noShowHeader ? <AuthenticatedHeader /> : null}
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: "transparent",
                },
                animation: "fade",
              }}
            />
          </View>
        </View>
      </View>

      {!useSidebar && shouldShowNav ? <BottomTabBar /> : null}
    </View>
  );
}
