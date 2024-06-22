// import React, { useState } from 'react'; 
// import { View, StyleSheet, ScrollView, Alert } from 'react-native'; 
// import { Button, TextInput, Provider as PaperProvider, Menu } from 'react-native-paper'; 

// const BusinessForm: React.FC<{ onAddBusiness: (business: any) => void }> = ({ onAddBusiness }) => {
  
//   const [companyName, setCompanyName] = useState<string>("");
//   const [jobPosition, setJobPosition] = useState<string>(""); 
//   const [qualification, setQualification] = useState<string>(""); 
//   const [mobile, setMobile] = useState<string>(""); 
//   const [address, setAddress] = useState<string>(""); 
//   const [description, setDescription] = useState<string>("");
//   const [gender, setGender] = useState<string>(""); 
//   const [experience, setExperience] = useState<string>(""); 

//   const genderOptions = ['Male', 'Female', 'Other']; 
//   const experienceOptions = ['1-2 years', '3-5 years', '6+ years'];

//   const [genderVisible, setGenderVisible] = useState<boolean>(false); 
//   const [experienceVisible, setExperienceVisible] = useState<boolean>(false); 

//   const handleAddBusiness = async () => {
    
//     if (!companyName || !jobPosition || !qualification || !mobile || !address || !description || !gender || !experience) {
     
//       Alert.alert('Error', 'Please fill all the fields');
//       return;
//     }

//     try {
      
//       const response = await axios.post(
//         'https://celebratingar2024.com/mobile/Backend/Business.php?refresh='+Math.random(), 
//         {
//           companyName,
//           jobPosition,
//           qualification,
//           mobile,
//           address,
//           description,
//           gender,
//           experience,
//         }
//       );

//       Alert.alert('Success', 'Business classified added successfully'); 
//       onAddBusiness(response.data); 
      

//       clearForm(); 
//     } catch (error) {
//       console.error(error); 
//       Alert.alert('Error', 'Failed to add business classified'); 
//     }
//   };

//   const clearForm = () => {
  
//     setCompanyName("");
//     setJobPosition("");
//     setQualification("");
//     setMobile("");
//     setAddress("");
//     setDescription("");
//     setGender("");
//     setExperience("");
//   };

//   return (
//     <PaperProvider> 
//       <ScrollView contentContainerStyle={styles.container}> 
//         <View style={styles.formContainer}> 
//           <TextInput
//             // style={styles.textInput}
//             label='Company Name'
//             onChangeText={setCompanyName}
//             value={companyName}
//             mode="outlined" 
//           />
//          <TextInput
//           label="Position of Job"
//           mode="outlined"
//           activeOutlineColor="#9b5b00"
//           placeholder="Position of Job"
//           value={jobPosition}
//           onChangeText={setJobPosition}
//           // style={styles.input}
//         />
//         <TextInput
//           label="Qualification"
//           mode="outlined"
//           activeOutlineColor="#9b5b00"
//           placeholder="Qualification"
//           value={qualification}
//           onChangeText={setQualification}
//           // style={styles.input}
//         />
//         <TextInput
//           label="Mobile"
//           mode="outlined"
//           activeOutlineColor="#9b5b00"
//           placeholder="Mobile"
//           value={mobile}
//           onChangeText={setMobile}
//           // style={styles.input}
//           inputMode="numeric"
//         />
//         <TextInput
//           label="Address"
//           mode="outlined"
//           activeOutlineColor="#9b5b00"
//           placeholder="Address"
//           value={address}
//           onChangeText={setAddress}
//           // style={styles.input}
//           multiline
//           numberOfLines={3}
//         />
//         <TextInput
//           label="Description"
//           mode="outlined"
//           activeOutlineColor="#9b5b00"
//           placeholder="Description"
//           value={description}
//           onChangeText={setDescription}
//           // style={styles.input}
//           multiline
//           numberOfLines={3}
//         />

//           <Menu
//             visible={genderVisible}
//             onDismiss={() => setGenderVisible(false)}
//             anchor={<Button onPress={() => setGenderVisible(true)}>-- Select Gender --</Button>}
//           >
//             {genderOptions.map((option, index) => (
//               <Menu.Item key={index} title={option} onPress={() => { setGender(option); setGenderVisible(false); }} />
//             ))}
//           </Menu>

//           <Menu
//             visible={experienceVisible}
//             onDismiss={() => setExperienceVisible(false)}
//             anchor={<Button onPress={() => setExperienceVisible(true)}>-- Select Experience --</Button>}
//           >
//             {experienceOptions.map((option, index) => (
//               <Menu.Item key={index} title={option} onPress={() => { setExperience(option); setExperienceVisible(false); }} />
//             ))}
//           </Menu>

//           <Button
//             onPress={handleAddBusiness}
//             mode="contained"
//             style={styles.button}
//           >
//             Add Business Classified
//           </Button>
//         </View>
//       </ScrollView>
//     </PaperProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#FFF6EA',
//     padding: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   formContainer: {
//     width: '100%',
//     padding: 16,
//     backgroundColor: '#FFF6EA',
//     marginBottom: 16,
//     borderRadius: 8,
//   },
//   textInput: {
//     borderColor: '#9b5b00',
//     marginBottom: 12,
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderRadius: 5,
//   },
//   button: {
//     marginTop: 16,
//     backgroundColor: "#9b5b00",
//   },
// });

// export default BusinessForm; 
