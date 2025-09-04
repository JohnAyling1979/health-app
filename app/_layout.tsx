import { Stack } from "expo-router";
import {
  HealthLinkPermissions,
  initializeHealth,
} from "react-native-health-link";

initializeHealth({
  read: [
    HealthLinkPermissions.Height,
    HealthLinkPermissions.Weight,
  ],
  write: [],
});

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="error" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
    </Stack>
  );
}
