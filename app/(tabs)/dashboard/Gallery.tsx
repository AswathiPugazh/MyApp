// // import React, { useState, useEffect } from 'react';
// // import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
// // import axios from 'axios';
// // import * as FileSystem from 'expo-file-system'; 
// // import { Ionicons } from '@expo/vector-icons';
// // import AddPhotos from './AddPhotos';
// // import { Card } from 'react-native-paper';

// // const AllImagesScreen = () => {
// //   const [profiles, setProfiles] = useState<any[]>([]); 
// //   const [showForm, setShowForm] = useState(false);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   const fetchData = async () => {
// //     try {
// //       const response = await axios.get('http://eamanager.com/mobile/Backend/AllImageGallery.php?refresh=' + Math.random());
// //       const sortedProfiles = response.data.sort((a: any, b: any) => {
// //         const dateA = new Date(a.Date) as any; 
// //         const dateB = new Date(b.Date) as any; 
// //         return dateB - dateA; 
// //       });
// //       setProfiles(sortedProfiles);
// //       setLoading(false);
// //     } catch (error) {
// //       setLoading(false);
// //       console.error('Error fetching profiles: ', error);
// //     }
// //   };

// //   const handlePreviewFile = async (uri: string) => {
// //     try {
// //       const fileInfo = await FileSystem.getInfoAsync(uri);
// //       if (fileInfo.exists) {
// //         await FileSystem.openAsync(uri); 
// //       } else {
// //         Alert.alert('File Not Found', 'The selected file could not be found on the device.');
// //       }
// //     } catch (error) {
// //       console.error('Error opening file:', error);
// //       Alert.alert('Error', 'Failed to open the file.');
// //     }
// //   };

// //   const toggleForm = () => {
// //     setShowForm(!showForm);
// //   };

// //   if (loading) {
// //     return (
// //       <View style={styles.container}>
// //         <Text>Loading...</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       {showForm ? (
// //         <AddPhotos />
// //       ) : (
// //         <FlatList
// //           data={profiles}
// //           renderItem={({ item }) => (
// //             <TouchableOpacity
// //               style={styles.profileItem}
// //               onPress={() => handlePreviewFile(item.file_data)}
// //             >
// //               {item.file_data && item.file_data.toLowerCase().endsWith('.jpg') ? (
// //                 <Image source={{ uri: `http://eamanager.com/mobile/Backend/${item.file_data}` }} style={styles.imagePreview} />
// //               ) : (
// //                 <Text>Gallery (jpg): {item.file_data}</Text>
// //               )}
// //               <Text>Posted At: {item.Date}</Text>
// //             </TouchableOpacity>
// //           )}
// //           keyExtractor={(item, index) => index.toString()}
// //         />
// //       )}
// //       <TouchableOpacity onPress={toggleForm} style={styles.addButton}>
// //         <Ionicons name="add-circle-outline" size={60} color="#9b5b00" />
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // export default AllImagesScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#FFF6EA',
// //     alignItems: 'center',
// //     paddingTop: 20,
// //   },
// //   profileItem: {
// //     marginTop: 10,
// //     padding: 10,
// //     borderColor: '#ccc',
// //     borderWidth: 1,
// //     borderRadius: 5,
// //     width: '100%',
// //   },
// //   imagePreview: {
// //     width: 350,
// //     height: 700,
// //     marginTop: 5,
// //     marginBottom: 5,
// //   },
// //   addButton: {
// //     position: 'absolute',
// //     bottom: 20,
// //     right: 20,
// //   },
// // });

// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
// import axios from 'axios';
// import * as FileSystem from 'expo-file-system';
// import { Ionicons } from '@expo/vector-icons';
// import AddPhotos from './AddPhotos';
// import { Card } from 'react-native-paper';

// interface Profile {
//   id: string;
//   Date: string;
//   file_data: string;
// }

// const GalleryScreen = () => {
//   const [profiles, setProfiles] = useState<Profile[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://eamanager.com/mobile/Backend/AllImageGallery.php?refresh=' + Math.random());
//       const sortedProfiles = response.data.sort((a: any, b: any) => {
//         const dateA = new Date(a.Date) as any;
//         const dateB = new Date(b.Date) as any;
//         return dateB - dateA;
//       });
//       setProfiles(sortedProfiles);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.error('Error fetching profiles: ', error);
//     }
//   };

//   const handlePreviewFile = async (uri: string) => {
//     try {
//       const downloadResumable = FileSystem.createDownloadResumable(
//         uri,
//         FileSystem.documentDirectory + 'filename.jpg'
//       );
  
//       const downloadResult = await downloadResumable.downloadAsync();
  
//       if (downloadResult && downloadResult.uri) {
//         await FileSystem.openAsync(downloadResult.uri);
//       } else {
//         Alert.alert('File Not Found', 'The selected file could not be found on the device.');
//       }
//     } catch (error) {
//       console.error('Error opening file:', error);
//       Alert.alert('Error', 'Failed to open the file.');
//     }
//   };

//   const toggleForm = () => {
//     setShowForm(!showForm);
//   };

//   const handleAddEvent = (newEvent: Profile) => {
//     setProfiles([newEvent, ...profiles]);
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {showForm ? (
//         <AddPhotos onAddEvent={handleAddEvent} />
//       ) : (
//         <FlatList
//           data={profiles}
//           renderItem={({ item }) => (
//             <TouchableOpacity
//               style={styles.profileItem}
//               onPress={() => handlePreviewFile(item.file_data)}
//             >
//               {item.file_data && item.file_data.toLowerCase().endsWith('.jpg') ? (
//                 <Image source={{ uri: `http://eamanager.com/mobile/Backend/${item.file_data}` }} style={styles.imagePreview} />
//               ) : (
//                 <Text>Gallery (jpg): {item.file_data}</Text>
//               )}
//               <Text>Posted At: {item.Date}</Text>
//             </TouchableOpacity>
//           )}
//           keyExtractor={(item, index) => index.toString()}
//         />
//       )}
//       <TouchableOpacity onPress={toggleForm} style={styles.addButton}>
//         <Ionicons name="add-circle-outline" size={60} color="#9b5b00" />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default GalleryScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF6EA',
//     alignItems: 'center',
//     paddingTop: 20,
//   },
//   profileItem: {
//     marginTop: 10,
//     padding: 10,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     width: '100%',
//   },
//   imagePreview: {
//     width: 350,
//     height: 700,
//     marginTop: 5,
//     marginBottom: 5,
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//   },
// });
