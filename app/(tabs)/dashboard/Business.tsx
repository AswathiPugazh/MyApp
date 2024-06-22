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

// const Business: React.FC<BusinessClassifedProps> = ({ onPostSuccess }) => {
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

// export default Business;
// Business.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import BusinessForm from './BusinessForm'; 

interface BusinessItem {
  id: string;
  companyName: string;
  jobPosition: string;
  qualification: string;
  mobile: string;
  address: string;
  description: string;
  created_at: string;
}

const Business: React.FC = () => {
  const [data, setData] = useState<BusinessItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://celebratingar2024.com/mobile/Backend/ReadBusiness.php');
      console.log('Fetched data:', response.data); // Debugging log
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // You can set an error state here if needed
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddBusiness = (newBusiness: BusinessItem) => {
    setData((prevData) => [newBusiness, ...prevData]);
    setShowForm(false); 
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showForm ? (
        <BusinessForm onAddBusiness={handleAddBusiness} />
      ) : (
        <View>
          <FlatList
            data={data}

            keyExtractor={(item) => item.id}
            
            renderItem={({ item }) => (
              
              <View style={styles.item}>

                <Text style={styles.header}>{item.companyName || 'N/A'}</Text>
                <Text style={styles.input}>{item.jobPosition || 'N/A'}</Text>
                <Text style={styles.input}>{item.qualification || 'N/A'}</Text>
                <Text style={styles.input}>{item.mobile || 'N/A'}</Text>
                <Text style={styles.input}>{item.address || 'N/A'}</Text>
                <Text style={styles.input}>{item.description || 'N/A'}</Text>
                <Text style={styles.input}>Posted On: {item.created_at || 'N/A'}</Text>
              </View>

                            
            )}
          />
        </View>
      )}
      <TouchableOpacity onPress={toggleForm} style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={60} color="#9b5b00" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF6EA',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: '500',
    color: '#9b5b00',
  },
  input: {
    fontSize: 16,
    color: 'black',
    marginBottom: 3,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default Business;
