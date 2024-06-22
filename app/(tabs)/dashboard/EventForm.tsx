// import React, { useState } from 'react';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import axios from 'axios';
// import { Button, TextInput, useTheme, Provider as PaperProvider } from 'react-native-paper';
// import { DatePickerModal, DatePickerModalRangeProps } from 'react-native-paper-dates';

// const EventFrom: React.FC<{ onAddEvent: (event: any) => void }> = ({ onAddEvent }) => {
//   const [fatherName, setFatherName] = useState<string>("");
//   const [participateName, setParticipateName] = useState<string>("");
//   const [age, setAge] = useState<string>("");
//   const [mobile, setMobile] = useState<string>("");
//   const [eventsToAdd, setEventstoAdd] = useState<string>("");
//   const [title, setTitle] = useState<string>("");
//   const [dateRange, setDateRange] = useState<{ startDate: Date | undefined; endDate: Date | undefined }>({ startDate: undefined, endDate: undefined });
//   const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
//   const { colors } = useTheme();

//   const handleAddEvents = async () => {
//     if (!dateRange.startDate || !dateRange.endDate || !title || !eventsToAdd) {
//       alert('Please select date range, title, and events to add');
//       return;
//     }

//     try {
//       const params = new URLSearchParams();
//       params.append('father_name', fatherName);
//       params.append('participate_name', participateName);
//       params.append('age', age);
//       params.append('mobile', mobile);
//       params.append('events_to_add', eventsToAdd);
//       params.append('title', title);
//       params.append('start_date', dateRange.startDate.toISOString());
//       params.append('end_date', dateRange.endDate.toISOString());

//       const response = await axios.post('https://celebratingar2024.com/mobile/Backend/AddEvents.php', params, {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       });
//       console.log(response.data);
//       if (response.data.includes('New record created successfully')) {
//         alert('Event added successfully');

//         const newEvent = {
//           father_name: fatherName,
//           participate_name: participateName,
//           age: age,
//           mobile: mobile,
//           events_to_add: eventsToAdd,
//           title: title,
//           start_date: dateRange.startDate.toISOString(),
//           end_date: dateRange.endDate.toISOString(),
//           created_at: new Date().toISOString(),
//           id: response.data.id,
//         };

//         onAddEvent(newEvent);

//         setFatherName("");
//         setParticipateName("");
//         setAge("");
//         setMobile("");
//         setEventstoAdd("");
//         setTitle("");
//         setDateRange({ startDate: undefined, endDate: undefined });
//       } else {
//         alert('Failed to add event');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const onDismissDatePicker = () => {
//     setShowDatePicker(false);
//   };

//   const onConfirmDatePicker: DatePickerModalRangeProps['onConfirm'] = (range) => {
//     setShowDatePicker(false);
//     setDateRange(range);
//   };

//   return (
//     <PaperProvider>
//       <ScrollView contentContainerStyle={styles.container}>
//         <View style={styles.formContainer}>
//           <TextInput
//             style={styles.TextInput}
//             placeholder='Father Name'
//             onChangeText={setFatherName}
//             value={fatherName}
//             mode="outlined"
//             label="Father Name"
//             activeOutlineColor="#9b5b00"
//           />

//           <TextInput
//             style={styles.TextInput}
//             mode="outlined"
//             activeOutlineColor="#9b5b00"
//             label="Participate Name"
//             placeholder='Participate Name'
//             onChangeText={setParticipateName}
//             value={participateName}
//           />

//           <TextInput
//             style={styles.TextInput}
//             mode="outlined"
//             activeOutlineColor="#9b5b00"
//             label="Age"
//             placeholder='Age'
//             onChangeText={setAge}
//             value={age}
//             keyboardType='numeric'
//           />

//           <TextInput
//             style={styles.TextInput}
//             mode="outlined"
//             activeOutlineColor="#9b5b00"
//             label="Mobile"
//             placeholder='Mobile'
//             onChangeText={setMobile}
//             value={mobile}
//             keyboardType="numeric"
//             maxLength={10}
//           />

//           <TextInput
//             style={styles.TextInput}
//             mode="outlined"
//             activeOutlineColor="#9b5b00"
//             label="Title"
//             placeholder='Title'
//             onChangeText={setTitle}
//             value={title}
//           />

//           <TextInput
//             style={styles.TextInput}
//             mode="outlined"
//             activeOutlineColor="#9b5b00"
//             label="Events to Add"
//             placeholder='Events to Add'
//             onChangeText={setEventstoAdd}
//             value={eventsToAdd}
//             multiline
//             numberOfLines={5}
//           />

//           <Button
//             onPress={() => setShowDatePicker(true)}
//             mode="outlined"
//           >
//             {dateRange.startDate && dateRange.endDate ? `${dateRange.startDate.toDateString()} - ${dateRange.endDate.toDateString()}` : 'Select Date Range'}
//           </Button>

//           <Button
//             onPress={handleAddEvents}
//             mode="contained"
//             style={styles.button}
//           >
//             Add Events
//           </Button>
//         </View>

//         <DatePickerModal
//           mode="range"
//           visible={showDatePicker}
//           onDismiss={onDismissDatePicker}
//           startDate={dateRange.startDate}
//           endDate={dateRange.endDate}
//           onConfirm={onConfirmDatePicker}
//           saveLabel="Save"
//           label="Select date range"
//           locale="en-US"
//         />
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
//   TextInput: {
//     borderColor: '#9b5b00',
//     marginBottom: 12,
//   },
//   button: {
//     marginTop: 16,
//     backgroundColor: "#9b5b00",
//   },
// });

// export default EventFrom;

import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { Button, TextInput, useTheme, Provider as PaperProvider } from 'react-native-paper';
import { DatePickerModal, DatePickerModalRangeProps } from 'react-native-paper-dates';


const EventForm: React.FC<{ onAddEvent: (event: any) => void }> = ({ onAddEvent }) => {
  const [fatherName, setFatherName] = useState<string>("");
  const [participateName, setParticipateName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [eventsToAdd, setEventsToAdd] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ startDate: Date | undefined; endDate: Date | undefined }>({ startDate: undefined, endDate: undefined });
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleAddEvents = async () => {
    if (!dateRange.startDate || !dateRange.endDate || !title || !eventsToAdd) {
      Alert.alert('Error', 'Please select date range, title, and events to add');
      return;
    }

    try {
      const response = await axios.post(
        'https://celebratingar2024.com/mobile/Backend/AddEvents.php',
        {
          father_name: fatherName,
          participate_name: participateName,
          age: age,
          mobile: mobile,
          events_to_add: eventsToAdd,
          title: title,
          start_date: dateRange.startDate.toISOString(),
          end_date: dateRange.endDate.toISOString(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status === "success") {
        Alert.alert('Success', 'Event added successfully');
        const newEvent = {
          ...response.data,
          father_name: fatherName,
          participate_name: participateName,
          age: age,
          mobile: mobile,
          events_to_add: eventsToAdd,
          title: title,
          start_date: dateRange.startDate.toISOString(),
          end_date: dateRange.endDate.toISOString(),
          created_at: new Date().toISOString(),
        };
        onAddEvent(newEvent);

        clearForm();
      } else {
        Alert.alert('Error', 'Failed to add event');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add event');
    }
  };

  const clearForm = () => {
    setFatherName("");
    setParticipateName("");
    setAge("");
    setMobile("");
    setEventsToAdd("");
    setTitle("");
    setDateRange({ startDate: undefined, endDate: undefined });
  };

  const onDismissDatePicker = () => {
    setShowDatePicker(false);
  };

  const onConfirmDatePicker: DatePickerModalRangeProps['onConfirm'] = (range) => {
    setShowDatePicker(false);
    setDateRange(range);
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.TextInput}
            label='Father Name'
            onChangeText={setFatherName}
            value={fatherName}
            mode="outlined"
          />
          <TextInput
            style={styles.TextInput}
            label='Participate Name'
            onChangeText={setParticipateName}
            value={participateName}
            mode="outlined"
          />
          <TextInput
            style={styles.TextInput}
            label='Age'
            onChangeText={setAge}
            value={age}
            keyboardType='numeric'
            mode="outlined"
          />
          <TextInput
            style={styles.TextInput}
            label='Mobile'
            onChangeText={setMobile}
            value={mobile}
            keyboardType='numeric'
            mode="outlined"
          />
          <TextInput
            style={styles.TextInput}
            label='Title'
            onChangeText={setTitle}
            value={title}
            mode="outlined"
          />
          <TextInput
            style={styles.TextInput}
            label='Events to Add'
            onChangeText={setEventsToAdd}
            value={eventsToAdd}
            multiline
            numberOfLines={5}
            mode="outlined"
          />
          <Button
            onPress={() => setShowDatePicker(true)}
            mode="outlined"
          >
            {dateRange.startDate && dateRange.endDate ? `${dateRange.startDate.toDateString()} - ${dateRange.endDate.toDateString()}` : 'Select Date Range'}
          </Button>
          <Button
            onPress={handleAddEvents}
            mode="contained"
            style={styles.button}
          >
            Add Event
          </Button>
        </View>
        <DatePickerModal
          mode="range"
          visible={showDatePicker}
          onDismiss={onDismissDatePicker}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onConfirm={onConfirmDatePicker}
          saveLabel="Save"
          label="Select date range"
          locale="en-US"
        />
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
  TextInput: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#9b5b00",
  },
});

export default EventForm;
