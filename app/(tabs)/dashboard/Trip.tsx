


// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import axios from 'axios';
// import { Ionicons } from '@expo/vector-icons';
// import TripForm from './TripForm';
// import { Paragraph } from 'react-native-paper';

// interface TripData {
//   id: string;
//   title: string;
//   events_to_add: string;
//   start_date: string;
//   end_date: string;
//   created_at: string;
// }

// export default function Trip() {
//   const [data, setData] = useState<TripData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [showForm, setShowForm] = useState<boolean>(false);
//   const [refresh, setRefresh] = useState<boolean>(false);

//   useEffect(() => {
//     axios.get('http://eamanager.com/mobile/Backend/ReadePilgrimageTrip.php?refresh=' + Math.random())
//       .then(response => {
//         const sortedData = response.data.sort((a: TripData, b: TripData) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
//         setData(sortedData);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the data!", error);
//         setLoading(false);
//       });
//   }, [refresh]);

//   const toggleForm = () => {
//     setShowForm(!showForm);
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
//         <TripForm />
//       ) : (
//         <View>
//           <FlatList
//             data={data}
//             keyExtractor={item => item.id}
//             renderItem={({ item }) => (
//               <View style={styles.item}>
//                 <Text style={styles.title}>{item.title}</Text>
//                 <ScrollView style={styles.scrollView}>
//                   <Text style={styles.Description}>{item.events_to_add}</Text>
//                   <Paragraph>
//                     <Text style={styles.Event_Date}>Arrival & Dispatch Date: </Text>
//                     <Text>{item.start_date} - {item.end_date}</Text>
//                   </Paragraph>
//                   <Text style={styles.TimeStamp}>Posted At: {item.created_at}</Text>
//                 </ScrollView>
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
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#FFF6EA',
//   },
//   title: {
//     fontSize: 18,
//     marginBottom: 5,
//     fontWeight: "500",
//     letterSpacing: 0.5,
//     color: "#f29f05",
//   },
//   Description: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   item: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     backgroundColor: 'rgba(128, 128, 128)',
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   scrollView: {
//     maxHeight: 150, 
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//   },
//   TimeStamp: {
//     fontSize: 14,
//   },
//   Event_Date: {
//     color: "#f29f05",
//     fontWeight: "500"
//   }
// });


import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import TripForm from './TripForm';

interface TripData {
  id: string;
  title: string;
  events_to_add: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

export default function Trip() {
  const [data, setData] = useState<TripData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://celebratingar2024.com/mobile/Backend/ReadePilgrimageTrip.php?refresh='+Math.random());
      const sortedData = response.data.sort((a: TripData, b: TripData) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setData(sortedData);
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the data!", error);
      setLoading(false);
    }
  };

  const handleAddTrip = (newTrip: TripData) => {
    setData([newTrip, ...data]); 
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
        <TripForm onAddTrip={handleAddTrip} />
      ) : (
        <View>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.events_to_add}</Text>
                <Text>{item.start_date} - {item.end_date}</Text>
                <Text>Posted At: {item.created_at}</Text>
              </View>
            )}
          />
        </View>
      )}
      <TouchableOpacity onPress={() => setShowForm(!showForm)} style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={60} color="#9b5b00" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFF6EA',
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "500",
    letterSpacing: 0.5,
    color: "#f29f05",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'rgba(128, 128, 128)',
    borderRadius: 10,
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
