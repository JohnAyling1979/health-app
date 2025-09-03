import { Text, View } from "react-native";

export default function Error() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Something went wrong</Text>
    </View>
  );
}