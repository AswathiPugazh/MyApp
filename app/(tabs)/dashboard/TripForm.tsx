// import React, { useState } from 'react';
// import { View, StyleSheet } from 'react-native';
// import axios from 'axios';
// import { Button, TextInput, useTheme, Provider as PaperProvider } from 'react-native-paper';
// import { DatePickerModal, registerTranslation } from 'react-native-paper-dates';
// // import { enUS } from 'date-fns/locale';

// // registerTranslation('en-US', {
// //   save: 'Save',
// //   selectSingle: 'Select date',
// //   selectMultiple: 'Select dates',
// //   selectRange: 'Select period',
// //   notAccordingToDateFormat: inputFormat => `Date format must be ${inputFormat}`,
// //   mustBeHigherThan: date => `Must be later than ${date}`,
// //   mustBeLowerThan: date => `Must be earlier than ${date}`,
// //   mustBeBetween: (startDate, endDate) => `Must be between ${startDate} and ${endDate}`,
// //   dateIsDisabled: 'Day is not allowed',
// //   previous: 'Previous',
// //   next: 'Next',
// //   typeInDate: 'Type in date',
// //   pickDateFromCalendar: 'Pick date from calendar',
// //   close: 'Close'
// // });

// type DateRange = {
//   startDate: Date;
//   endDate: Date;
// };

// const TripForm = () => {
//   const [eventsToAdd, setEventstoAdd] = useState("");
//   const [title, setTitle] = useState("");
//   const [dateRange, setDateRange] = useState<DateRange | null>(null);
//   const { colors } = useTheme();
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleAddEvents = async () => {
//     if (!dateRange || !title || !eventsToAdd) {
//       alert('Please select date range, title, and events to add');
//       return;
//     }

//     try {
//       const params = new URLSearchParams();
//       params.append('events_to_add', eventsToAdd);
//       params.append('title', title);
//       params.append('start_date', dateRange.startDate.toISOString());
//       params.append('end_date', dateRange.endDate.toISOString());

//       const response = await axios.post('http://eamanager.com/mobile/Backend/PilgrimageTrip.php', params, {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       });

//       console.log(response.data);
//       if (response.data.includes('New record created successfully')) {
//         alert('Event added successfully');
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

//   const onConfirmDatePicker = (range: { startDate: Date | undefined; endDate: Date | undefined }) => {
//     setShowDatePicker(false);
//     if (range.startDate && range.endDate) {
//       setDateRange({ startDate: range.startDate, endDate: range.endDate });
//     }
//   };

//   return (
//     <PaperProvider>
//       <View style={styles.container}>
//         <TextInput
//           style={styles.input}
//           placeholder='Title'
//           onChangeText={setTitle}
//           value={title}
//           mode="outlined"
//           label="Title"
//           activeOutlineColor="#9b5b00"
//         />
//         <TextInput
//           style={styles.input}
//           placeholder='Events to Add'
//           onChangeText={setEventstoAdd}
//           value={eventsToAdd}
//           mode="outlined"
//           label="Events to Add"
//           activeOutlineColor="#9b5b00"
//           multiline={true}
//           numberOfLines={10}
//         />
//         <Button
//           onPress={() => setShowDatePicker(true)}
//           mode="outlined"
//           style={styles.input}
//         >
//           {dateRange ? `${dateRange.startDate.toDateString()} - ${dateRange.endDate.toDateString()}` : 'Select Date Range'}
//         </Button>

//         <Button
//           onPress={handleAddEvents}
//           mode="contained"
//           buttonColor='#9b5b00'
//         >
//           Add Events
//         </Button>

//         <DatePickerModal
//           mode="range"
//           visible={showDatePicker}
//           onDismiss={onDismissDatePicker}
//           startDate={dateRange ? dateRange.startDate : undefined}
//           endDate={dateRange ? dateRange.endDate : undefined}
//           onConfirm={onConfirmDatePicker}
//           saveLabel="Save"
//           label="Select date range"
//           locale="en-US"
//         />
//       </View>
//     </PaperProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF6EA',
//     padding: 20,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   input: {
//     width: '100%',
//     marginBottom: 20,
//   },
// });

// export default TripForm;



import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import axios from 'axios';
import { Alert } from 'react-native';
import { Button, TextInput, useTheme, Provider as PaperProvider } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

type DateRange = {
  startDate: Date;
  endDate: Date;
};

interface TripData {
  id: string;
  title: string;
  events_to_add: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

interface TripFormProps {
  onAddTrip: (newTrip: TripData) => void;
}

const TripForm: React.FC<TripFormProps> = ({ onAddTrip }) => {
  const [eventsToAdd, setEventsToAdd] = useState("");
  const [title, setTitle] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const { colors } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTrip = async () => {
    if (!dateRange || !title || !eventsToAdd) {
      alert('Please select date range, title, and events to add');
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append('events_to_add', eventsToAdd);
      params.append('title', title);
      params.append('start_date', dateRange.startDate.toISOString());
      params.append('end_date', dateRange.endDate.toISOString());

      const response = await axios.post('https://celebratingar2024.com/mobile/Backend/PilgrimageTrip.php', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log(response.data);
      if (response.data.includes('New record created successfully')) {
        Alert.alert('Trip added successfully'); 

        const newTrip: TripData = {
          id: response.data.id,
          title: title,
          events_to_add: eventsToAdd,
          start_date: dateRange.startDate.toISOString(),
          end_date: dateRange.endDate.toISOString(),
          created_at: new Date().toISOString(),
        };

        onAddTrip(newTrip); // Call the prop function to add the new trip
      } else {
        alert('Failed to add trip');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDismissDatePicker = () => {
    setShowDatePicker(false);
  };

  const onConfirmDatePicker = (range: { startDate: Date | undefined; endDate: Date | undefined }) => {
    setShowDatePicker(false);
    if (range.startDate && range.endDate) {
      setDateRange({ startDate: range.startDate, endDate: range.endDate });
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Title'
          onChangeText={setTitle}
          value={title}
          mode="outlined"
          label="Title"
          activeOutlineColor="#9b5b00"
        />
        <TextInput
          style={styles.input}
          placeholder='Events to Add'
          onChangeText={setEventsToAdd}
          value={eventsToAdd}
          mode="outlined"
          label="Events to Add"
          activeOutlineColor="#9b5b00"
          multiline={true}
          numberOfLines={10}
        />
        <Button
          onPress={() => setShowDatePicker(true)}
          mode="outlined"
          style={styles.input}
        >
          {dateRange ? `${dateRange.startDate.toDateString()} - ${dateRange.endDate.toDateString()}` : 'Select Date Range'}
        </Button>

        <Button
          onPress={handleAddTrip}
          mode="contained"
          buttonColor='#9b5b00'
        >
          Add Trip
        </Button>

        <DatePickerModal
          mode="range"
          visible={showDatePicker}
          onDismiss={onDismissDatePicker}
          startDate={dateRange ? dateRange.startDate : undefined}
          endDate={dateRange ? dateRange.endDate : undefined}
          onConfirm={onConfirmDatePicker}
          saveLabel="Save"
          label="Select date range"
          locale="en-US"
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6EA',
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
});

export default TripForm;
