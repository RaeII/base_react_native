import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { useColorScheme, vars } from "nativewind";
import { getThemeTokens } from "@/shared/styles/theme";

export default function AuthLayout() {
  const { colorScheme } = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const themeVars = vars(getThemeTokens(isDarkMode));

  return (
    <View className="flex-1 bg-background" style={themeVars}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" />
        </Stack>
      </View>
    </View>
  );
}
