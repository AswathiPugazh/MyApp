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
      const response = await axios.get('https://celebratingar2024.com/mobile/Backend/ReadBusiness.php?refresh=' + Math.random());
      console.log('Fetched data:', response.data);
  
      const parsedData: BusinessItem[] = response.data.map((item: BusinessItem) => ({
        ...item,
        created_at: new Date(item.created_at) // Parse 'created_at' as Date
      }));
  
      const sortedData = parsedData.sort((a: BusinessItem, b: BusinessItem) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB.getTime() - dateA.getTime();
      });
  
      setData(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      <Text style={styles.input}>Posted On: {item.created_at ? item.created_at.toLocaleString() : 'N/A'}</Text>
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
