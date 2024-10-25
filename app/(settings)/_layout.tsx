import React from "react";
import { Stack } from "expo-router";

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="about"
        options={{
          title: "About",
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="colours"
        options={{
          title: "Colours",
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="feedback"
        options={{
          title: "Feedback",
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="licenses"
        options={{
          title: "Licenses",
          headerShown: false,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="auth"
        options={{
          title: "Join Us!",
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default SettingsLayout;
