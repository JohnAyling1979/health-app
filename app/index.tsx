import { Text, View } from "react-native";
import useHealthData from "../hooks/useHealthData";

export default function Index() {
  const data = useHealthData();
  console.log('healthData: ', data);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
