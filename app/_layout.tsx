import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

// Custom Bright Theme

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ScrollView>
      <Stack>
        <Stack.Screen name="localstorage" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
