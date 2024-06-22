// // import React from 'react';
// // import { View, Text, StyleSheet } from 'react-native';

// // export default function Profile() {
// //   return (
// //     <View style={styles.container}>
// //       <Text>Profile Page</Text>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 16,
// //   },
// // });


// import React, { useState } from "react";
// import { useNavigation } from '@react-navigation/native';
// import { View, Text, Image, StyleSheet, Button, TextInput } from 'react-native';
// import Axios from 'axios';
// import { RouteProp } from '@react-navigation/native';

// interface UserData {
//   user: {
//     name: string;
//     mobileNumber: string;
//     email: string;
//   };
// }

// interface ProfileProps {
//   route: RouteProp<{ params: { userData: UserData } }, 'params'>;
// }

// const Profile: React.FC<ProfileProps> = ({ route }) => {
//   console.log(route.params);
//   const { userData } = route.params;
//   const navigation = useNavigation();

//   const [image, setImage] = useState<string | null>(null);
//   const [selectedGender, setSelectedGender] = useState<string>('');
//   const [educationQualification, setEducationQualification] = useState<string>("");
//   const [married, setMarried] = useState<string>("");
//   const [weddingAnniversary, setWeddingAnniversary] = useState<string>("");
//   const [dateOfBirth, setDateOfBirth] = useState<string>("");
//   const [address, setAddress] = useState<string>("");

//   const [isEditable, setIsEditable] = useState<boolean>(true);
//   const [profiles, setProfiles] = useState<any[]>([]); // Adjust the type as needed

//   const saveProfile = () => {
//     const newPr = {
//       name: userData.user.name,
//       mobile_number: userData.user.mobileNumber,
//       profile_image: image,
//       Gender: selectedGender,
//       educationQualification: educationQualification,
//       weddingAnniversary: weddingAnniversary,
//       dateOfBirth: dateOfBirth,
//       Address: address
//     };

//     Axios.post('http://192.168.1.101/Backend/Profile/Profile.php', newPr)
//       .then(response => {
//         console.log(response.data);
//         alert('User profile saved successfully!');
//         setIsEditable(false);
//         setProfiles([...profiles, newPr]); // Update profiles state with the new profile
//       })
//       .catch(error => {
//         console.error('Error saving profile: ', error);
//       });
//   };

//   const toggleProfileView = () => {
//     setIsEditable(!isEditable);
//   };

//   if (!userData || !userData.user) {
//     return (
//       <View>
//         <Text>Error: User data is missing or incomplete.</Text>
//       </View>
//     );
//   }

//   const { email, mobileNumber, name } = userData.user;

//   return (
//     <View style={styles.profileContent}>
//       <Button
//         title="Profile"
//         color="green"
//         onPress={toggleProfileView}
//       />
//       {isEditable && (
//         <View>
//           <Text style={styles.ProfileHeader1}>Welcome, {name}!</Text>
//           <Image
//             style={{ width: 100, height: 100, alignSelf: 'center', marginVertical: 20 }}
//             // source={image ? { uri: image } : require('../../assets/pro_icon.png')}
//           />
//           <Text style={styles.ProfileTextBox}>
//             Name: {name}
//           </Text>
//           <Text style={styles.ProfileTextBox}>Mobile: {mobileNumber}</Text>
//           <Text style={styles.ProfileTextBox}>Email: {email}</Text>
//           <TextInput
//             placeholder="Education qualification"
//             value={educationQualification}
//             style={styles.ProfileTextBox}
//             onChangeText={text => setEducationQualification(text)}
//           />
//           {/* Other input fields */}
//           <View style={styles.buttonContainer}>
//             <Button title='Edit' color='green' onPress={() => setIsEditable(true)} />
//             <Button title='Save' color='purple' onPress={saveProfile} />
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({
//   profileContent: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   ProfileHeader1: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: 'black',
//     marginVertical: 10,
//     textAlign: 'center',
//   },
//   ProfileTextBox: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//     marginVertical: 5,
//     textAlign: 'left',
//     marginLeft: '10%',
//     marginRight: '15%',
//     borderWidth: 1,
//     borderColor: 'grey',
//     width: '75%',
//     height: 35,
//     borderRadius: 3,
//     padding: 5,
//     paddingLeft: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginTop: 20,
//   },
//   ProfileAddress: {
//     height: '10%',
//     width: '75%',
//     borderWidth: 0.8,
//     borderColor: 'grey',
//     textAlign: 'left',
//     marginLeft: '10%',
//     marginRight: '15%',
//     borderRadius: 3,
//     paddingLeft: 20,
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//   },
// });

