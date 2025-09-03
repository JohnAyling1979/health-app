import GoogleHealthService from "@/services/GoogleHealthService";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const { readHealthData } = GoogleHealthService();

export default function Dashboard() {
  const [weightData, setWeightData] = useState<any[]>([]);
  const [stepsData, setStepsData] = useState<any[]>([]);

  useEffect(() => {
    readHealthData('Weight', {
      timeRangeFilter: {
        operator: 'between',
        startTime: new Date('2025-01-01').toISOString(),
        endTime: new Date().toISOString(),
      },
    }).then((data: any) => {
      setWeightData(data);
    });

    readHealthData('Steps', {
      timeRangeFilter: {
        operator: 'between',
        startTime: new Date('2025-01-01').toISOString(),
        endTime: new Date().toISOString(),
      },
    }).then((data: any) => {
      setStepsData(data);
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
      <Text>Weight Records: {weightData.length}</Text>
      <Text>Steps Records: {stepsData.length}</Text>
    </View>
  );
}
