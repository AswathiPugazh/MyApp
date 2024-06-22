// // import React, { useState } from 'react';
// // import { View, StyleSheet, ScrollView } from 'react-native';
// // import axios from 'axios';
// // import { Button, Provider as PaperProvider, Paragraph } from 'react-native-paper';
// // import { Alert } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import * as DocumentPicker from "expo-document-picker";

// // export interface Profile {
// //   id: string;
// //   created_at: string;
// //   file_data: string;
// // }

// // interface AddPhotoProps {
// //   onAddEvent: (newEvent: Profile) => void;
// // }

// // export default function AddPhotos(props: AddPhotoProps) {
 
// //   const [selectedFile, setSelectedFile] = useState<string | null>(null);
// //   const [fileName, setFileName] = useState<string>('');
// //   const [fileType, setFileType] = useState<string>('');

// //   const [profiles, setProfiles] = useState<any[]>([]); 

// //   const pickDocument = async () => {
// //     try {
// //       let result = await DocumentPicker.getDocumentAsync({});
// //       console.log('DocumentPicker result:', result);

// //       if (!result.canceled && result.assets.length > 0 && result.assets[0].uri) {
// //         const uri = result.assets[0].uri;
// //         const name = result.assets[0].name;
// //         const type = result.assets[0].mimeType || 'application/octet-stream'; 

// //         setSelectedFile(uri);
// //         setFileName(name);
// //         setFileType(type);

// //         console.log('Selected file URI:', uri);
// //         console.log('Selected file Name:', name);
// //         console.log('Selected file Type:', type);
// //       } else {
// //         console.log('Document picking cancelled or URI missing');
// //       }
// //     } catch (error) {
// //       console.error('Error picking document:', error);
// //     }
// //   };

// //   const saveProfile = () => {
// //     // Form validation
// //     if ( !selectedFile) {
// //       Alert.alert('Please select the file!');
// //       return;
// //     }

// //     const uniqueFileName = `Gallery_${Date.now()}_${fileName}`;
// //     const formData = new FormData();
    
// //     formData.append('Gallery_file', {
// //       uri: selectedFile,
// //       type: fileType,
// //       name: uniqueFileName,
// //     } as any); // Adjust type or use an appropriate cast

// //     axios.post('https://celebratingar2024.com/mobile/Backend/Matrimonial.php', formData, {
// //       timeout: 10000,
// //       headers: { 'Content-Type': 'multipart/form-data' },
// //     })
// //     .then(response => {
// //       // Handle successful response
// //       const newProfile = {
        
// //         file_data: `uploads/${uniqueFileName}`, 
// //       };
// //       setProfiles([...profiles, newProfile]);
// //       Alert.alert('Success', 'User details saved successfully!');
      
// //       // Reset form fields after successful save
      
// //       setSelectedFile(null);
// //       setFileName('');
// //       setFileType('');
// //     })
// //     .catch(error => {
// //       if (error.response) {
        
// //         if (error.response.status === 400) {
// //           Alert.alert('Error', 'Bad request. Please check your inputs.');
// //         } else if (error.response.status === 500) {
// //           Alert.alert('Error', 'Internal server error. Please try again later.');
// //         } else {
// //           Alert.alert('Error', 'Server error. Please try again later.');
// //         }
// //       } else if (error.request) {
        
// //         Alert.alert('Error', 'Network error. Please check your internet connection.');
// //       } else {
        
// //         Alert.alert('Error', 'An unknown error occurred. Please try again.');
// //       }
// //       console.error('Error:', error.message);
// //     });
// //   };

// //   return (
// //     <PaperProvider>
// //             <SafeAreaView style={styles.container}>
// //       <ScrollView contentContainerStyle={styles.scrollView}>
// //         <View style={styles.formContainer}>
// //           <Button onPress={pickDocument} mode="outlined" style={styles.button}>
// //             Upload File
// //           </Button>
// //           <Paragraph>{fileName ? `Selected File: ${fileName}` : 'No file selected'}</Paragraph>
// //           <Button onPress={saveProfile} mode="contained" style={styles.button}>
// //             Save
// //           </Button>
// //         </View>
// //       </ScrollView>
// //     </SafeAreaView>
// //     </PaperProvider>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //   },
// //   scrollView: {
// //     flexGrow: 1,
// //     justifyContent: 'center',
// //   },
// //   formContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //   },
// //   input: {
// //     marginBottom: 10,
// //   },
// //   button: {
// //     marginVertical: 10,
// //   },
// // });

// import React, { useState } from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import axios from 'axios';
// import { Button, Provider as PaperProvider, Paragraph } from 'react-native-paper';
// import { Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import * as DocumentPicker from "expo-document-picker";
// import * as FileSystem from 'expo-file-system';

// interface Profile {
//   id: string;
//   created_at: string;
//   file_data: string;
// }

// interface AddPhotoProps {
//   onAddEvent: (newEvent: Profile) => void;
// }

// const AddPhotos: React.FC<AddPhotoProps> = ({ onAddEvent }) => {
//   const [selectedFile, setSelectedFile] = useState<string | null>(null);
//   const [fileName, setFileName] = useState<string>('');
//   const [fileType, setFileType] = useState<string>('');

//   const pickDocument = async () => {
//     try {
//       let result = await DocumentPicker.getDocumentAsync({});
//       console.log('DocumentPicker result:', result);

//       if (!result.cancelled && result.type === 'success' && result.uri) {
//         const uri = result.uri;
//         const name = result.name || '';
//         const type = result.type || 'application/octet-stream';

//         setSelectedFile(uri);
//         setFileName(name);
//         setFileType(type);

//         console.log('Selected file URI:', uri);
//         console.log('Selected file Name:', name);
//         console.log('Selected file Type:', type);
//       } else {
//         console.log('Document picking cancelled or URI missing');
//       }
//     } catch (error) {
//       console.error('Error picking document:', error);
//     }
//   };

//   const saveProfile = async () => {
//     // Form validation
//     if (!selectedFile) {
//       Alert.alert('Please select the file!');
//       return;
//     }

//     try {
//       const downloadResumable = FileSystem.createDownloadResumable(
//         selectedFile,
//         FileSystem.documentDirectory + 'filename.jpg'
//       );

//       const downloadResult = await downloadResumable.downloadAsync();

//       if (downloadResult && downloadResult.uri) {
//         const formData = new FormData();
//         formData.append('Gallery_file', {
//           uri: downloadResult.uri,
//           type: fileType,
//           name: fileName,
//         } as any);

//         axios.post('https://celebratingar2024.com/mobile/Backend/Matrimonial.php', formData, {
//           timeout: 10000,
//           headers: { 'Content-Type': 'multipart/form-data' },
//         })
//         .then(response => {
//           // Handle successful response
//           const newProfile: Profile = {
//             id: response.data.id, // adjust accordingly if response structure is different
//             created_at: response.data.created_at, // adjust accordingly if response structure is different
//             file_data: response.data.file_data, // adjust accordingly if response structure is different
//           };
//           onAddEvent(newProfile); // Notify parent component about the new profile
//           Alert.alert('Success', 'User details saved successfully!');
//           // Reset form fields after successful save
//           setSelectedFile(null);
//           setFileName('');
//           setFileType('');
//         })
//         .catch(error => {
//           if (error.response) {
//             if (error.response.status === 400) {
//               Alert.alert('Error', 'Bad request. Please check your inputs.');
//             } else if (error.response.status === 500) {
//               Alert.alert('Error', 'Internal server error. Please try again later.');
//             } else {
//               Alert.alert('Error', 'Server error. Please try again later.');
//             }
//           } else if (error.request) {
//             Alert.alert('Error', 'Network error. Please check your internet connection.');
//           } else {
//             Alert.alert('Error', 'An unknown error occurred. Please try again.');
//           }
//           console.error('Error:', error.message);
//         });
//       } else {
//         Alert.alert('File Not Found', 'The selected file could not be found on the device.');
//       }
//     } catch (error) {
//       console.error('Error saving profile:', error);
//       Alert.alert('Error', 'Failed to save the profile.');
//     }
//   };

//   return (
//     <PaperProvider>
//       <SafeAreaView style={styles.container}>
//         <ScrollView contentContainerStyle={styles.scrollView}>
//           <View style={styles.formContainer}>
//             <Button onPress={pickDocument} mode="outlined" style={styles.button}>
//               Upload File
//             </Button>
//             <Paragraph>{fileName ? `Selected File: ${fileName}` : 'No file selected'}</Paragraph>
//             <Button onPress={saveProfile} mode="contained" style={styles.button}>
//               Save
//             </Button>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </PaperProvider>
//   );
// };

// export default AddPhotos;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   scrollView: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   formContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   button: {
//     marginVertical: 10,
//   },
// });
