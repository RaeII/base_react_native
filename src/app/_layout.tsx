import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Head from "expo-router/head";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import { vars } from "nativewind";
import { AuthProvider } from "@/shared/contexts/AuthContext";
import { useTheme } from "@/shared/hooks/useTheme";
import { getThemeTokens } from "@/shared/styles/theme";
import "@/styles/global.css";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const queryClient = new QueryClient();

export default function Layout() {
    const { colorScheme } = useTheme();
    const themeVars = vars(getThemeTokens(colorScheme === "dark"));

    const Header = () => {
        return (
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
                <html lang="pt-BR" />
                <title>Base React Native</title>
            </Head>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-background" style={themeVars}>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <Header />
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            contentStyle: {
                                backgroundColor: "transparent",
                            },
                        }}
                    />
                </QueryClientProvider>
            </AuthProvider>
        </SafeAreaView>
    );
}