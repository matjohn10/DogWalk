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
