import AppleHealthService from "@/services/AppleHealthService";
import GoogleHealthService from "@/services/GoogleHealthService";
import { useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";

let readHealthData: (recordType: any, options: any) => Promise<any[]>;

if (Platform.OS === 'ios') {
  readHealthData = AppleHealthService().readHealthData;
} else {
  readHealthData = GoogleHealthService().readHealthData;
}

export default function Dashboard() {
  const [heightData, setHeightData] = useState<number>(0);
  const [weightData, setWeightData] = useState<number>(0);

  useEffect(() => {
    readHealthData('Height', {
      timeRangeFilter: {
        operator: 'between',
        startTime: new Date('2025-01-01').toISOString(),
        endTime: new Date().toISOString(),
      },
    }).then((data: any) => {
      setHeightData(data);
    }).catch((error: any) => {
      console.log('error', error);
    });

    readHealthData('Weight', {
      timeRangeFilter: {
        operator: 'between',
        startTime: new Date('2025-01-01').toISOString(),
        endTime: new Date().toISOString(),
      },
    }).then((data: any) => {
      setWeightData(data);
    }).catch((error: any) => {
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
