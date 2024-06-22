// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, Linking, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import { Ionicons } from '@expo/vector-icons';
// import MatrimonialForm, { Profile } from './MatrimonialForm'; 
// import { Paragraph } from 'react-native-paper';

// export default function Matrimonial() {
//   const [data, setData] = useState<Profile[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://eamanager.com/mobile/Backend/Matrimonial_AllProfiles.php?refresh=' + Math.random());
//       const uniqueData = response.data.reduce((acc: Profile[], current: Profile) => {
//         const x = acc.find(item => item.id === current.id && item.created_at === current.created_at);
//         if (!x) {
//           return acc.concat([current]);
//         } else {
//           return acc;
//         }
//       }, []);
//       const sortedData = uniqueData.sort((a: Profile, b: Profile) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
//       setData(sortedData);
//     } catch (error) {
//       console.error("There was an error fetching the data!", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addNewEvent = (newEvent: Profile) => {
//     if (!newEvent.id) {
//       newEvent.id = Math.random().toString(36).substring(7);  
//     }
//     setData([newEvent, ...data]);
//     setShowForm(false); 
//   };

//   const toggleForm = () => {
//     setShowForm(!showForm);
//   };

//   const handlePreviewFile = (uri: string) => {
//     Linking.openURL(uri);
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
//         <MatrimonialForm onAddEvent={addNewEvent} />
//       ) : (
//         <>
//           <FlatList
//             data={data}
//             keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString(36).substring(7)}
//             renderItem={({ item }) => (
//               <View style={styles.item}>
//                 <Text style={styles.header}>{item.father_name || 'N/A'}</Text>
//                 <Text style={styles.input}>{item.bride_or_groom_name || 'N/A'}</Text>
//                 <Text style={styles.input}>Rasi: {item.rasi || 'N/A'}</Text>
//                 <Text style={styles.input}>Natchathiram: {item.natchathiram || 'N/A'}</Text>
//                 <TouchableOpacity onPress={() => handlePreviewFile(`http://eamanager.com/mobile/Backend/${item.jathagam_file_path}`)}>
//                   <Text>View Jathagam</Text>
//                 </TouchableOpacity>
//                 <Paragraph style={styles.date}>
//                   <Text>Posted On: {item.created_at || 'N/A'}</Text>
//                 </Paragraph>
//               </View>
//             )}
//           />
//         </>
//       )}
//       <TouchableOpacity onPress={toggleForm} style={styles.addButton}>
//         <Ionicons name="add-circle-outline" size={60} color="#9b5b00" />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#FFF6EA',
//   },
//   item: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     backgroundColor: 'rgba(128, 128, 128)',
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     zIndex: 1,
//   },
//   header: {
//     fontSize: 18,
//     marginBottom: 5,
//     fontWeight: "500",
//     letterSpacing: 0.5,
//     color: "#f29f05",
//   },
//   input: {
//     fontSize: 15,
//     fontWeight: "400",
//     letterSpacing: 0.5,
//     color: "black"
//   },
//   date: {
//     textAlign: "left"
//   }
// });
