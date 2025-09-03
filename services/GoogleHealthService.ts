import {
    getGrantedPermissions,
    initialize,
    readRecords,
    ReadRecordsOptions,
    RecordType,
    requestPermission
} from "react-native-health-connect";

function GoogleHealthService() {
    const initializeHealthData = async () => {
        try {
            const isInitialized = await initialize();

            if (isInitialized) {
                await requestPermission([
                    { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
                    { accessType: 'read', recordType: 'BasalBodyTemperature' },
                    { accessType: 'read', recordType: 'BasalMetabolicRate' },
                    { accessType: 'read', recordType: 'BloodGlucose' },
                    { accessType: 'read', recordType: 'BloodPressure' },
                    { accessType: 'read', recordType: 'BodyFat' },
                    { accessType: 'read', recordType: 'BodyTemperature' },
                    { accessType: 'read', recordType: 'BoneMass' },
                    { accessType: 'read', recordType: 'BloodPressure' },
                    { accessType: 'read', recordType: 'CervicalMucus' },
                    { accessType: 'read', recordType: 'CyclingPedalingCadence' },
                    { accessType: 'read', recordType: 'Distance' },
                    { accessType: 'read', recordType: 'ElevationGained' },
                    { accessType: 'read', recordType: 'ExerciseSession' },
                    { accessType: 'read', recordType: 'FloorsClimbed' },
                    { accessType: 'read', recordType: 'HeartRate' },
                    { accessType: 'read', recordType: 'Height' },
                    { accessType: 'read', recordType: 'Hydration' },
                    { accessType: 'read', recordType: 'LeanBodyMass' },
                    { accessType: 'read', recordType: 'MenstruationFlow' },
                    { accessType: 'read', recordType: 'MenstruationPeriod' },
                    { accessType: 'read', recordType: 'Nutrition' },
                    { accessType: 'read', recordType: 'OvulationTest' },
                    { accessType: 'read', recordType: 'OxygenSaturation' },
                    { accessType: 'read', recordType: 'Power' },
                    { accessType: 'read', recordType: 'RespiratoryRate' },
                    { accessType: 'read', recordType: 'RestingHeartRate' },
                    { accessType: 'read', recordType: 'SexualActivity' },
                    { accessType: 'read', recordType: 'SleepSession' },
                    { accessType: 'read', recordType: 'Speed' },
                    { accessType: 'read', recordType: 'StepsCadence' },
                    { accessType: 'read', recordType: 'Steps' },
                    { accessType: 'read', recordType: 'TotalCaloriesBurned' },
                    { accessType: 'read', recordType: 'Vo2Max' },
                    { accessType: 'read', recordType: 'Weight' },
                    { accessType: 'read', recordType: 'WheelchairPushes' },
                ]);
            }

            return isInitialized;
        } catch (error) {
            console.error('Error initializing health data: ', error);
            return false;
        }
    }

    const readHealthData = async (recordType: RecordType, options: ReadRecordsOptions) => {
        try {
            const grantedPermissions = await getGrantedPermissions();

            const grantedPermission = grantedPermissions.find(permission => permission.recordType === recordType);

            if (!grantedPermission) {
                throw new Error('Permission not granted');
            }

            const healthData = await readRecords(recordType, options);
            return healthData.records;
        } catch (error) {
            console.error('Error reading health data: ', error);
        }
    }

    return {
        initializeHealthData,
        readHealthData,
    }
}

export default GoogleHealthService;