import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/providers/AuthProvider";
import { Colors } from "@/constants/Colors";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: "Map",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(settings)"
              options={{
                title: "Settings",
                headerStyle: {
                  backgroundColor: Colors[colorScheme ?? "light"].background,
                },
              }}
            />
            <Stack.Screen
              name="[dog]"
              options={{
                title: "Form",
                headerShown: false,
                presentation: "modal",
              }}
            />
            <Stack.Screen
              name="region"
              options={{
                title: "Region",
                headerShown: false,
                presentation: "modal",
              }}
            />
          </Stack>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
