import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Text>Health App</Text>
      <Button title="Dashboard" onPress={() => router.push('/dashboard')} />
    </View>
  );
}
