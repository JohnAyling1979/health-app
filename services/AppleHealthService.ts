import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';

function AppleHealthService() {
    const initializeHealthData: () => Promise<boolean> = async () => {
        return new Promise((resolve, reject) => {
            const permissions: HealthKitPermissions = {
                permissions: {
                    read: [
                        AppleHealthKit.Constants.Permissions.Height,
                        AppleHealthKit.Constants.Permissions.Weight,
                    ],
                    write: [],
                },
            };

            AppleHealthKit.initHealthKit(permissions, (error: string) => {
                if (error) {
                    console.error('Error initializing health data: ', error);
                    return resolve(false);
                }

                return resolve(true);
            });
        });
    }

    const readHealthData: (recordType: any, options: any) => Promise<number> = async (recordType: any, options: any) => {
        return new Promise((resolve, reject) => {
            if (recordType === 'Height') {
                AppleHealthKit.getLatestHeight(options,(error: string, result: any) => {
                    if (error) {
                        return resolve(0);
                    }

                    if (result === null) {
                        return resolve(0);
                    }

                    return resolve(parseInt(result.value));
                });
            } else if (recordType === 'Weight') {
                AppleHealthKit.getLatestWeight(options,(error: string, result: any) => {
                    if (error) {
                        return resolve(0);
                    }

                    if (result === null) {
                        return resolve(0);
                    }

                    return resolve(parseInt(result.value));
                });
            } else {
                return resolve(0);
            }
        });
    }

    return {
        initializeHealthData,
        readHealthData,
    }
}

export default AppleHealthService;