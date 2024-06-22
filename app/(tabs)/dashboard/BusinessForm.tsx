// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import axios from 'axios';
// import { TextInput, Button, RadioButton, Text } from 'react-native-paper';
// import DropDown from 'react-native-paper-dropdown';

// interface BusinessClassifedProps {
//   onPostSuccess?: () => void;
// }

// interface BusinessData {
//   id: string;
//   companyName: string;
//   jobPosition: string;
//   qualification: string;
//   mobile: string;
//   address: string;
//   description: string;
//   gender: string;
//   experience: string;
//   created_at: string;
// }

// const BusinessForm: React.FC<BusinessClassifedProps> = ({ onPostSuccess }) => {
//   const [companyName, setCompanyName] = useState<string>("");
//   const [jobPosition, setJobPosition] = useState<string>("");
//   const [qualification, setQualification] = useState<string>("");
//   const [mobile, setMobile] = useState<string>("");
//   const [address, setAddress] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const [gender, setGender] = useState<string>("male");
//   const [experience, setExperience] = useState<string>("");
//   const [showDropDown, setShowDropDown] = useState<boolean>(false);
//   const [isPosting, setIsPosting] = useState<boolean>(false);
//   const [postError, setPostError] = useState<string>("");

//   const experienceList = [
//     { label: '0-1 years', value: '0-1' },
//     { label: '1-3 years', value: '1-3' },
//     { label: '3-5 years', value: '3-5' },
//     { label: '5+ years', value: '5+' },
//   ];

//   const resetFields = () => {
//     setCompanyName("");
//     setJobPosition("");
//     setQualification("");
//     setMobile("");
//     setAddress("");
//     setDescription("");
//     setGender("male");
//     setExperience("");
//   };

//   const handleToPostJob = async () => {
//     if (isPosting) {
//       return;
//     }

//     setIsPosting(true);
//     setPostError("");

//     try {
//       const formData = new FormData();
//       formData.append('companyName', companyName);
//       formData.append('jobPosition', jobPosition);
//       formData.append('qualification', qualification);
//       formData.append('mobile', mobile);
//       formData.append('address', address);
//       formData.append('description', description);
//       formData.append('gender', gender);
//       formData.append('experience', experience);

//       const response = await axios.post("http://eamanager.com/mobile/Backend/Business.php", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       console.log(response.data);

//       if (response.data.status === "success") {
//         resetFields();
//         Alert.alert("Job posted successfully");
//         onPostSuccess && onPostSuccess();
//       } else {
//         setPostError("Error posting job: " + response.data.msg);
//       }
//     } catch (error) {
//       const errorMessage = (error as any).message || "An unexpected error occurred.";
//       console.error("Error posting job:", error);
//       setPostError("Error posting job: " + errorMessage);
//     } finally {
//       setIsPosting(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollViewContainer}>
//       <View style={styles.container}>
//         <TextInput
//           label="Company Name"
//           mode="outlined"
//           activeOutlineColor="#9b5b00"
//           placeholder="Your company name"
//           value={companyName}
//           onChangeText={setCompanyName}
//           style={styles.input}
//         />
//         <TextInput
//           label="Position of Job"
//           mode="outlined"
//           activeOutlineColor="#9b5b00"
//           placeholder="Position of Job"
//           value={jobPosition}
//           onChangeText={setJobPosition}
//           style={styles.input}
//         />
//         <TextInput
//           label="Qualification"
//           mode="outlined"
//           activeOutlineColor="#9b5b00"
//           placeholder="Qualification"
//           value={qualification}
//           onChangeText={setQualification}
//           style={styles.input}
//         />
//         <TextInput
//           label="Mobile"
//           mode="outlined"
//           activeOutlineColor="#9b5b00"
//           placeholder="Mobile"
//           value={mobile}
//           onChangeText={setMobile}
//           style={styles.input}
//           inputMode="numeric"
//         />
//         <TextInput
//           label="Address"
//           mode="outlined"
//           activeOutlineColor="#9b5b00"
//           placeholder="Address"
//           value={address}
//           onChangeText={setAddress}
//           style={styles.input}
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
//           style={styles.input}
//           multiline
//           numberOfLines={3}
//         />

//         <DropDown
//           label={"Select Experience"}
//           mode={"outlined"}
//           visible={showDropDown}
//           showDropDown={() => setShowDropDown(true)}
//           onDismiss={() => setShowDropDown(false)}
//           value={experience}
//           setValue={setExperience}
//           list={experienceList}
//         />

//         <View style={styles.radioButtonGroup}>
//           <Text style={styles.radioButtonLabel}>Gender</Text>
//           <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
//             <View style={styles.radioButtonItem}>
//               <RadioButton value="male" />
//               <Text>Male</Text>
//             </View>
//             <View style={styles.radioButtonItem}>
//               <RadioButton value="female" />
//               <Text>Female</Text>
//             </View>
//           </RadioButton.Group>
//         </View>

//         <TouchableOpacity onPress={handleToPostJob} style={styles.buttonContainer}>
//           <Button onPress={handleToPostJob} mode="contained" buttonColor="#9b5b00" labelStyle={{ color: 'white' }}>
//             Post
//           </Button>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollViewContainer: {
//     flexGrow: 1,
//     width: "100%",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF6EA',
//     padding: 20,
//     alignItems: "center",
//   },
//   input: {
//     marginBottom: 15,
//     fontSize: 17,
//     width: "100%",
//   },
//   radioButtonGroup: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     width: "100%",
//   },
//   radioButtonItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 10,
//   },
//   radioButtonLabel: {
//     fontSize: 17,
//     marginRight: 10,
//   },
//   dropdown: {
//     marginBottom: 10,
//   },
//   buttonContainer: {
//     width: "50%",
//   },
// });

// export default BusinessForm;

import React, { useState } from 'react'; // Import React and useState hook from React library
import { View, StyleSheet, ScrollView, Alert } from 'react-native'; // Import necessary components from React Native
import axios from 'axios'; // Import axios for making HTTP requests
import { Button, TextInput, Provider as PaperProvider, Menu } from 'react-native-paper'; // Import components and styles from React Native Paper library

const BusinessForm: React.FC<{ onAddBusiness: (business: any) => void }> = ({ onAddBusiness }) => {
  // Define BusinessForm component as a functional component accepting a prop onAddBusiness
  const [companyName, setCompanyName] = useState<string>(""); // Define state for companyName using useState hook
  const [jobPosition, setJobPosition] = useState<string>(""); // Define state for jobPosition using useState hook
  const [qualification, setQualification] = useState<string>(""); // Define state for qualification using useState hook
  const [mobile, setMobile] = useState<string>(""); // Define state for mobile using useState hook
  const [address, setAddress] = useState<string>(""); // Define state for address using useState hook
  const [description, setDescription] = useState<string>(""); // Define state for description using useState hook
  const [gender, setGender] = useState<string>(""); // Define state for gender using useState hook
  const [experience, setExperience] = useState<string>(""); // Define state for experience using useState hook

  const genderOptions = ['Male', 'Female', 'Other']; // Define array of gender options
  const experienceOptions = ['1-2 years', '3-5 years', '6+ years']; // Define array of experience options

  const [genderVisible, setGenderVisible] = useState<boolean>(false); // Define state for gender dropdown visibility
  const [experienceVisible, setExperienceVisible] = useState<boolean>(false); // Define state for experience dropdown visibility

  const handleAddBusiness = async () => {
    // Define function to handle adding a new business classified
    if (!companyName || !jobPosition || !qualification || !mobile || !address || !description || !gender || !experience) {
      // Check if any field is empty and show an alert if so
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    try {
      // Make an axios post request to add the business classified
      const response = await axios.post(
        'https://celebratingar2024.com/mobile/Backend/Business.php', 
        {
          companyName,
          jobPosition,
          qualification,
          mobile,
          address,
          description,
          gender,
          experience,
        }
      );

      Alert.alert('Success', 'Business classified added successfully'); 
      onAddBusiness(response.data); 
      

      clearForm(); 
    } catch (error) {
      console.error(error); // Log any errors
      Alert.alert('Error', 'Failed to add business classified'); 
    }
  };

  const clearForm = () => {
    // Define function to clear the form fields
    setCompanyName("");
    setJobPosition("");
    setQualification("");
    setMobile("");
    setAddress("");
    setDescription("");
    setGender("");
    setExperience("");
  };

  return (
    <PaperProvider> 
      <ScrollView contentContainerStyle={styles.container}> 
        <View style={styles.formContainer}> 
          <TextInput
            // style={styles.textInput}
            label='Company Name'
            onChangeText={setCompanyName}
            value={companyName}
            mode="outlined" 
          />
         <TextInput
          label="Position of Job"
          mode="outlined"
          activeOutlineColor="#9b5b00"
          placeholder="Position of Job"
          value={jobPosition}
          onChangeText={setJobPosition}
          // style={styles.input}
        />
        <TextInput
          label="Qualification"
          mode="outlined"
          activeOutlineColor="#9b5b00"
          placeholder="Qualification"
          value={qualification}
          onChangeText={setQualification}
          // style={styles.input}
        />
        <TextInput
          label="Mobile"
          mode="outlined"
          activeOutlineColor="#9b5b00"
          placeholder="Mobile"
          value={mobile}
          onChangeText={setMobile}
          // style={styles.input}
          inputMode="numeric"
        />
        <TextInput
          label="Address"
          mode="outlined"
          activeOutlineColor="#9b5b00"
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          // style={styles.input}
          multiline
          numberOfLines={3}
        />
        <TextInput
          label="Description"
          mode="outlined"
          activeOutlineColor="#9b5b00"
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          // style={styles.input}
          multiline
          numberOfLines={3}
        />

          <Menu
            visible={genderVisible}
            onDismiss={() => setGenderVisible(false)}
            anchor={<Button onPress={() => setGenderVisible(true)}>-- Select Gender --</Button>}
          >
            {genderOptions.map((option, index) => (
              <Menu.Item key={index} title={option} onPress={() => { setGender(option); setGenderVisible(false); }} />
            ))}
          </Menu>

          <Menu
            visible={experienceVisible}
            onDismiss={() => setExperienceVisible(false)}
            anchor={<Button onPress={() => setExperienceVisible(true)}>-- Select Experience --</Button>}
          >
            {experienceOptions.map((option, index) => (
              <Menu.Item key={index} title={option} onPress={() => { setExperience(option); setExperienceVisible(false); }} />
            ))}
          </Menu>

          <Button
            onPress={handleAddBusiness}
            mode="contained"
            style={styles.button}
          >
            Add Business Classified
          </Button>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF6EA',
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: '100%',
    padding: 16,
    backgroundColor: '#FFF6EA',
    marginBottom: 16,
    borderRadius: 8,
  },
  textInput: {
    borderColor: '#9b5b00',
    marginBottom: 12,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#9b5b00",
  },
});

export default BusinessForm; 
