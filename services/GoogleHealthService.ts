import {
    getGrantedPermissions,
    HeightRecord,
    initialize,
    readRecords,
    ReadRecordsOptions,
    requestPermission,
    WeightRecord,
} from "react-native-health-connect";

function GoogleHealthService() {
    const initializeHealthData = async () => {
        try {
            const isInitialized = await initialize();

            if (isInitialized) {
                await requestPermission([
                    { accessType: 'read', recordType: 'Height' },
                    { accessType: 'read', recordType: 'Weight' },
                ]);
            }

            return isInitialized;
        } catch (error) {
            console.error('Error initializing health data: ', error);
            return false;
        }
    }

    const readHealthData = async (recordType: any, options: ReadRecordsOptions) => {
        try {
            const grantedPermissions = await getGrantedPermissions();

            const grantedPermission = grantedPermissions.find(permission => permission.recordType === recordType);

            if (!grantedPermission) {
                throw new Error('Permission not granted');
            }

            const healthData = await readRecords(recordType, options);

            if (healthData.records.length === 0) {
                return 0;
            }

            if (healthData.records[0] === null) {
                return 0;
            }

            if (recordType === 'Weight') {
                return (healthData.records[0] as WeightRecord).weight.value;
            } else if (recordType === 'Height') {
                return (healthData.records[0] as HeightRecord).height.value;
            } else {
                return 0;
            }
        } catch (error) {
            console.error('Error reading health data: ', error);
            return 0;
        }
    }

    return {
        initializeHealthData,
        readHealthData,
    }
}

export default GoogleHealthService;