import AppleHealthKit from 'react-native-health';

function AppleHealthService() {
    const initializeHealthData: () => Promise<boolean> = async () => {
        console.log('initializeHealthData', AppleHealthKit.initHealthKit);
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }

    const readHealthData = async (recordType: string, options: any) => {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    }

    return {
        initializeHealthData,
        readHealthData,
    }
}

export default AppleHealthService;