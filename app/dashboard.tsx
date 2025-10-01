import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { HealthLinkDataType, read } from "react-native-health-link";

export default function Dashboard() {
  const [heightData, setHeightData] = useState<number>(0);
  const [weightData, setWeightData] = useState<number>(0);

  useEffect(() => {
    read(HealthLinkDataType.Height, {
      startDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
    }).then((data) => {
      setHeightData(parseInt(`${data[0]?.value ?? '0'}`));
    }).catch((error) => {
      console.log('error', error);
    });
    read(HealthLinkDataType.Weight, {
      startDate: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
    }).then((data) => {
      setWeightData(parseInt(`${data[0]?.value ?? '0'}`));
    }).catch((error) => {
      console.log('error', error);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Dashboard</Text>
      <Text>Height: {heightData}</Text>
      <Text>Weight: {weightData}</Text>
    </View>
  );
}
