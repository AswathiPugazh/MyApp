// import React, { useState } from 'react';
// import { View, Alert, StyleSheet } from 'react-native';
// import * as DocumentPicker from 'expo-document-picker';
// import axios from 'axios';
// import { Button } from 'react-native-paper';

// export default function AddPhotos() {
//   const [selectedFile, setSelectedFile] = useState<string | null>(null);
//   const [profiles, setProfiles] = useState<{ file_data: string }[]>([]);

//   const pickDocument = async () => {
//     try {
//       let result = await DocumentPicker.getDocumentAsync({});
//       console.log('DocumentPicker result:', result);

//       if (!result.cancelled && result.type === 'success' && result.uri) {
//         setSelectedFile(result.uri);
//         console.log('Selected file URI:', result.uri);
//       } else {
//         console.log('Document picking cancelled or URI missing');
//       }
//     } catch (error) {
//       console.error('Error picking document:', error);
//     }
//   };

//   const saveProfile = () => {
//     if (!selectedFile) {
//       Alert.alert('Error', 'Please select a file.');
//       return;
//     }

//     console.log('File URI:', selectedFile);

//     const formData = new FormData();
//     const uniqueFileName = `Gallery_${Date.now()}.jpg`;

//     formData.append('gallery_file', {
//       uri: selectedFile,
//       type: 'image/jpeg', // Adjust type as per your file type
//       name: uniqueFileName,
//     });

//     axios
//       .post('http://eamanager.com/mobile/Backend/Gallery.php', formData, {
//         timeout: 10000,
//         headers: { 'Content-Type': 'multipart/form-data' },
//       })
//       .then((response) => {
//         console.log('Save Profile Response:', response.data);
//         const newProfile = {
//           file_data: `uploads/${uniqueFileName}`,
//         };
//         setProfiles([...profiles, newProfile]);
//         Alert.alert('Success', 'File saved successfully!');
//         setSelectedFile(null); // Reset selectedFile after successful upload
//       })
//       .catch((error) => {
//         console.error('Error saving file:', error);
//         Alert.alert('Error', 'Failed to save file. Please try again later.');
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Button onPress={pickDocument} style={styles.ChooseImage} mode="contained">
//         Choose Image
//       </Button>

//       <Button onPress={saveProfile} style={styles.ButtonSaveContainer} mode="contained">
//         Save
//       </Button>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF6EA',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   ChooseImage: {
//     marginVertical: 10,
//     marginLeft: 20,
//     color: 'black',
//     fontWeight: '600',
//     padding: 10,
//     width: '50%',
//     marginTop: 5,
//     backgroundColor: '#A3C9FF',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   ButtonSaveContainer: {
//     marginVertical: 10,
//     backgroundColor: '#9b5b00',
//     padding: 10,
//     width: '50%',
//     marginTop: 5,
//     fontSize: 16,
//     textAlign: 'center',
//   },
// });
