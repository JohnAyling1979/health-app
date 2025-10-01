import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { HealthLinkPermissions, initializeHealth } from "react-native-health-link";

export default function RootLayout() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeHealth({
      read: [
        HealthLinkPermissions.Height,
        HealthLinkPermissions.Weight,
      ],
      write: [],
    }).then(() => {
      setIsInitialized(true);
    }).catch((error) => {
      router.push('/error');
    });
  }, []);

  if (!isInitialized) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="error" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
    </Stack>
  );
}
