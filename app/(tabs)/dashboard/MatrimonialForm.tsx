import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { Button, Paragraph, TextInput } from 'react-native-paper';
import { Alert } from 'react-native';

import DropDown from "react-native-paper-dropdown";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from "expo-document-picker";



export default function MatrimonialForm() {
  const [fatherName, setFatherName] = useState<string>('');
  const [brideOrGroomName, setBrideOrGroomName] = useState<string>('');
  const [rasi, setRasi] = useState<string>('');
  const [natchathiram, setNatchathiram] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileType, setFileType] = useState<string>('');
  const [showRasiDropDown, setShowRasiDropDown] = useState<boolean>(false);
  const [showNatchathiramDropDown, setShowNatchathiramDropDown] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<any[]>([]); // Adjust the type as per your profile structure

  const rasiOptions = [
    { label: 'மேஷம் (Aries)', value: 'மேஷம் (Aries)' },
        { label: 'ரிஷபம் (Taurus)', value: 'ரிஷபம் (Taurus)' },
        { label: 'மிதுனம் (Gemini)', value: 'மிதுனம் (Gemini)' },
        { label: 'கடகம் (Cancer)', value: 'கடகம் (Cancer)' },
        { label: 'சிம்மம் (Leo)', value: 'சிம்மம் (Leo)' },
        { label: 'கன்னி (Virgo)', value: 'கன்னி (Virgo)' },
        { label: 'துலாம் (Libra)', value: 'துலாம் (Libra)' },
        { label: 'விருச்சிகம் (Scorpio)', value: 'விருச்சிகம் (Scorpio)' },
        { label: 'தனுசு (Saggitarius)', value: 'தனுசு (Saggitarius)' },
        { label: 'மகரம் (Capricorn)', value: 'மகரம் (Capricorn)' },
        { label: 'கும்பம் (Aquarius)', value: 'கும்பம் (Aquarius)' },
        { label: 'மீனம் (Pisces)', value: 'மீனம் (Pisces)'}
  ];

  const natchathiramOptions = [
    { label: 'அஸ்வினி (Ashwini)', value: 'அஸ்வினி (Ashwini)' },
            { label: 'பரணி (Bharani)', value: 'பரணி (Bharani)' },
            { label: 'கார்த்திகை (Krittika)', value: 'கார்த்திகை (Krittika)' },
            { label: 'ரோகிணி (Rohini)', value: 'ரோகிணி (Rohini)' },
            { label: 'மிருகசீரிஷம் (Mrigashirsha)', value: 'மிருகசீரிஷம் (Mrigashirsha)' },
            { label: 'திருவாதிரை (Ardra)', value: 'திருவாதிரை (Ardra)' },
            { label: 'புனர்பூசம் (Punarvasu)', value: 'புனர்பூசம் (Punarvasu)' },
            { label: 'பூசம் (Pushya)', value: 'பூசம் (Pushya)' },
            { label: 'ஆயில்யம் (Ashlesha)', value: 'ஆயில்யம் (Ashlesha)' },
            { label: 'மகம் (Magha)', value: 'மகம் (Magha)' },
            { label: 'பூரம் (Purva Phalguni)', value: 'பூரம் (Purva Phalguni)' },
            { label: 'உத்திரம் (Uttara Phalguni)', value: 'உத்திரம் (Uttara Phalguni)' },
            { label: 'ஹஸ்தம் (Hasta)', value: 'ஹஸ்தம் (Hasta)' },
            { label: 'சுவாதி (Chitra)', value: 'சுவாதி (Chitra)' },
            { label: 'விசாகம் (Swati)', value: 'விசாகம் (Swati)' },
            { label: 'அனுஷம் (Vishakha)', value: 'அனுஷம் (Vishakha)' },
            { label: 'கேட்டை (Anuradha)', value: 'கேட்டை (Anuradha)' },
            { label: 'ஜெயிஷ்டா (Jyeshta)', value: 'ஜெயிஷ்டா (Jyeshta)' },
            { label: 'மூலம் (Moola)', value: 'மூலம் (Moola)' },
            { label: 'பூராடம் (Purva Ashadha)', value: 'பூராடம் (Purva Ashadha)' },
            { label: 'உத்திராடம் (Uttara Ashadha)', value: 'உத்திராடம் (Uttara Ashadha)' },
            { label: 'திருவோணம் (Shravana)', value: 'திருவோணம் (Shravana)' },
            { label: 'திருவோணம் (Dhanishta)', value: 'திருவோணம் (Dhanishta)' },
            { label: 'ஷதாபிஷம் (Shatabhisha)', value: 'ஷதாபிஷம் (Shatabhisha)' },
            { label: 'பூரட்டாதி (Purva Bhadrapada)', value: 'பூரட்டாதி (Purva Bhadrapada)' },
            { label: 'உத்திரட்டாதி (Uttara Bhadrapada)', value: 'உத்திரட்டாதி (Uttara Bhadrapada)' },
            { label: 'ரேவதி (Revati)', value: 'ரேவதி (Revati)' }
  ];

  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      console.log('DocumentPicker result:', result);

      if (!result.canceled && result.assets.length > 0 && result.assets[0].uri) {
        const uri = result.assets[0].uri;
        const name = result.assets[0].name;
        const type = result.assets[0].mimeType || 'application/octet-stream'; 

        setSelectedFile(uri);
        setFileName(name);
        setFileType(type);

        console.log('Selected file URI:', uri);
        console.log('Selected file Name:', name);
        console.log('Selected file Type:', type);
      } else {
        console.log('Document picking cancelled or URI missing');
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const saveProfile = () => {
    // Form validation
    if (!fatherName || !brideOrGroomName || !rasi || !natchathiram || !selectedFile) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const uniqueFileName = `jathagam_${Date.now()}_${fileName}`;
    const formData = new FormData();
    formData.append('father_name', fatherName);
    formData.append('bride_or_groom_name', brideOrGroomName);
    formData.append('rasi', rasi);
    formData.append('natchathiram', natchathiram);
    formData.append('jathagam_file', {
      uri: selectedFile,
      type: fileType,
      name: uniqueFileName,
    } as any); // Adjust type or use an appropriate cast

    axios.post('http://eamanager.com/mobile/Backend/Matrimonial.php', formData, {
      timeout: 10000,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then(response => {
      // Handle successful response
      const newProfile = {
        father_name: fatherName,
        bride_or_groom_name: brideOrGroomName,
        rasi: rasi,
        natchathiram: natchathiram,
        jathagam_file_path: `uploads/${uniqueFileName}`, 
      };
      setProfiles([...profiles, newProfile]);
      Alert.alert('Success', 'User details saved successfully!');
      
      // Reset form fields after successful save
      setFatherName('');
      setBrideOrGroomName('');
      setRasi('');
      setNatchathiram('');
      setSelectedFile(null);
      setFileName('');
      setFileType('');
    })
    .catch(error => {
      if (error.response) {
        // Handle server errors
        if (error.response.status === 400) {
          Alert.alert('Error', 'Bad request. Please check your inputs.');
        } else if (error.response.status === 500) {
          Alert.alert('Error', 'Internal server error. Please try again later.');
        } else {
          Alert.alert('Error', 'Server error. Please try again later.');
        }
      } else if (error.request) {
        // Handle network errors
        Alert.alert('Error', 'Network error. Please check your internet connection.');
      } else {
        // Handle other errors
        Alert.alert('Error', 'An unknown error occurred. Please try again.');
      }
      console.error('Error:', error.message);
    });
  };

  const handleFatherNameChange = (text: string) => {
    setFatherName(text);
  };

  const handleBrideOrGroomNameChange = (text: string) => {
    setBrideOrGroomName(text);
  };

  const handleRasiChange = (value: string) => {
    setRasi(value);
  };

  const handleNatchathiramChange = (value: string) => {
    setNatchathiram(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.formContainer}>
          <TextInput
            label="Father's Name"
            value={fatherName}
            onChangeText={handleFatherNameChange}
            style={styles.input}
          />
          <TextInput
            label="Bride/Groom's Name"
            value={brideOrGroomName}
            onChangeText={handleBrideOrGroomNameChange}
            style={styles.input}
          />
          <DropDown
            label="Select Rasi"
            mode="outlined"
            visible={showRasiDropDown}
            showDropDown={() => setShowRasiDropDown(true)}
            onDismiss={() => setShowRasiDropDown(false)}
            value={rasi}
            setValue={handleRasiChange}
            list={rasiOptions}
          />
          <DropDown
            label="Select Natchathiram"
            mode="outlined"
            visible={showNatchathiramDropDown}
            showDropDown={() => setShowNatchathiramDropDown(true)}
            onDismiss={() => setShowNatchathiramDropDown(false)}
            value={natchathiram}
            setValue={handleNatchathiramChange}
            list={natchathiramOptions}
          />
          <Button onPress={pickDocument} mode="outlined" style={styles.button}>
            Select Jathagam File
          </Button>
          <Paragraph>{fileName ? `Selected File: ${fileName}` : 'No file selected'}</Paragraph>
          <Button onPress={saveProfile} mode="contained" style={styles.button}>
            Save Profile
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginVertical: 10,
  },
});


