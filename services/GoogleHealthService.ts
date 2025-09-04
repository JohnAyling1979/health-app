import {
    getGrantedPermissions,
    initialize,
    readRecords,
    ReadRecordsOptions,
    requestPermission
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
            return healthData.records || [];
        } catch (error) {
            console.error('Error reading health data: ', error);
            return [];
        }
    }

    return {
        initializeHealthData,
        readHealthData,
    }
}

export default GoogleHealthService;