import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const Contact = () => {

  return (
    <View style={styles.container}>
      
      <Text style={styles.label}>Admin:</Text>
      <Text style={styles.text}>Pandiyan</Text>
      <Text style={styles.label}>Mobile Number:</Text>
      <Text style={styles.text}>123-456-7890</Text>
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.text}>123 Main St, City, Country</Text>
      <View style={styles.socialIcons}>
        <FontAwesome name="youtube" size={50} color="red" style={styles.icon} />
        <FontAwesome name="facebook" size={50} color="blue" style={styles.icon} />
        <FontAwesome name="instagram" size={50} color="purple" style={styles.icon} />
      </View>
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    textAlign:"left",
    marginTop: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 20,
    
  },
  icon: {
    marginHorizontal: 10,
  },
});
