import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import "@/styles/global.css";

const queryClient = new QueryClient();

export default function Layout() {
    const { colorScheme } = useColorScheme();

    return (
        <SafeAreaView
            className="flex-1 bg-background"
        >
            <QueryClientProvider client={queryClient}>
                <Stack
                    screenOptions={{
                        headerShown: false,
                        contentStyle: {
                            backgroundColor: "transparent",
                        },
                    }}
                />
            </QueryClientProvider>
        </SafeAreaView>
    );
}