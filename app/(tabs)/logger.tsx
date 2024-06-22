// import RNFS from 'react-native-fs';

// const logFilePath = RNFS.DocumentDirectoryPath + '/app.log';

// export const logToFile = async (message: string) => {
//   const timestamp = new Date().toISOString();
//   const logMessage = `${timestamp} - ${message}\n`;

//   try {
//     await RNFS.appendFile(logFilePath, logMessage, 'utf8');
//     console.log('Log written to file');
//   } catch (error) {
//     console.error('Failed to write log to file', error);
//   }
// };

// export const readLogs = async () => {
//   try {
//     const logs = await RNFS.readFile(logFilePath, 'utf8');
//     console.log('Logs:', logs);
//     return logs;
//   } catch (error) {
//     console.error('Failed to read log file', error);
//     return null;
//   }
// };
