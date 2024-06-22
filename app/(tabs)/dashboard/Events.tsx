// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import axios from 'axios';
// import EventForm from './EventForm'; 

// interface EventItem {
//   id: string;
//   title: string;
//   events_to_add: string;
//   start_date: string;
//   end_date: string;
//   created_at: string;
// }

// const Events: React.FC = () => {
//   const [data, setData] = useState<EventItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [showForm, setShowForm] = useState<boolean>(false);
//   const [refresh, setRefresh] = useState<boolean>(false);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://celebratingar2024.com/mobile/Backend/ReadAddEvents.php?refresh='+Math.random());
//       console.log('Response:', response.data);
//       setData(response.data);
//     } catch (error) {
//       console.error("There was an error fetching the data!", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleForm = () => {
//     setShowForm(!showForm);
//   };

//   const handleAddEvent = (newEvent: EventItem) => {
//     setData((prevData) => [newEvent, ...prevData]);
//     setShowForm(false); 
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
//         <EventForm onAddEvent={handleAddEvent} />
//       ) : (
//         <View>
//           <FlatList
//             data={data}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <View style={styles.item}>
//                 <Text style={styles.header}>{item.title || 'N/A'}</Text>
//                 <Text style={styles.input}>{item.events_to_add || 'N/A'}</Text>
//                 <Text style={styles.input}>Start Date: {item.start_date || 'N/A'}</Text>
//                 <Text style={styles.input}>End Date: {item.end_date || 'N/A'}</Text>
//                 <Text style={styles.input}>Posted On: {item.created_at || 'N/A'}</Text>
//               </View>
//             )}
//           />
//         </View>
//       )}
//       <TouchableOpacity onPress={toggleForm} style={styles.addButton}>
//         <Ionicons name="add-circle-outline" size={60} color="#9b5b00" />
//       </TouchableOpacity>
//     </View>
//   );
// };

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
//     backgroundColor: '#f0f0f0',
//     marginBottom: 10,
//     borderRadius: 10,
//   },
//   header: {
//     fontSize: 18,
//     marginBottom: 5,
//     fontWeight: '500',
//     color: '#9b5b00',
//   },
//   input: {
//     fontSize: 16,
//     color: 'black',
//     marginBottom: 3,
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//   },
// });

// export default Events;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import EventForm from './EventForm'; 

interface EventItem {
  id: string;
  title: string;
  events_to_add: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

const Events: React.FC = () => {
  const [data, setData] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://celebratingar2024.com/mobile/Backend/ReadAddEvents.php?refresh=' + Math.random());
      const sortedData = response.data.sort((a: EventItem, b: EventItem) => {
        // Assuming created_at is in ISO date format
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      setData(sortedData);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddEvent = (newEvent: EventItem) => {
    setData((prevData) => [newEvent, ...prevData]);
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
        <EventForm onAddEvent={handleAddEvent} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
                <Text style={styles.header}>Title: {item.title || 'N/A'}</Text>
                <Text style={styles.input}>{item.events_to_add || 'N/A'}</Text>
                <Text style={styles.input}>Start Date: {item.start_date || 'N/A'}</Text>
                <Text style={styles.input}>End Date: {item.end_date || 'N/A'}</Text>
                
                  <Text>Posted On: </Text>
                  <Text>{item.created_at || 'N/A'}</Text>
                
              </View>
          )}
        />
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

export default Events;
