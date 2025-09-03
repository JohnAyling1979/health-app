import { useEffect, useState } from 'react';
import {
    initialize,
    readRecords,
    ReadRecordsResult,
    requestPermission
} from 'react-native-health-connect';

const useHealthData = () => {
    const [healthData, setHealthData] = useState<ReadRecordsResult<"ActiveCaloriesBurned"> | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isPermissionGranted, setIsPermissionGranted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initializeHealthData = async () => {
            const isInitialized = await initialize();

            setIsInitialized(isInitialized);

            if (!isInitialized) {
                setError('Health data not initialized');
                return;
            }

            const isPermissionGranted = await requestPermission([
                { accessType: 'read', recordType: 'ActiveCaloriesBurned' }
            ]);

            setIsPermissionGranted(isPermissionGranted.length === 1);

            if (isPermissionGranted.length !== 1) {
                setError('Permission not granted');
                return;
            }

            const result = await readRecords('ActiveCaloriesBurned', {
                timeRangeFilter: {
                  operator: 'between',
                  startTime: '2023-01-09T12:00:00.405Z',
                  endTime: '2023-01-09T23:53:15.405Z',
                },
            });

            setHealthData(result);
        };

        initializeHealthData();
    }, []);

    return {
        healthData,
        isInitialized,
        isPermissionGranted,
        error
    };
};

export default useHealthData;