import GoogleHealthService from "@/services/GoogleHealthService";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const { initializeHealthData } = GoogleHealthService();

export default function RootLayout() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeHealthData().then((isInitialized) => {
      setIsInitialized(isInitialized);
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
