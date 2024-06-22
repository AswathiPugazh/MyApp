import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type IconName = "person-outline" | "calendar-outline" | "heart-outline" | "briefcase-outline" | "airplane-outline" | "images-outline" | "people-outline" | "log-out-outline";

interface MenuItem {
  name: string;
  icon: IconName;
  route: string;
}

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  const menuItems: MenuItem[] = [
    
    { name: "Upcoming Events", icon: "calendar-outline", route: "/(tabs)/dashboard/Events" },
    { name: "Business Classified", icon: "briefcase-outline", route: "/(tabs)/dashboard/Business" },
    { name: "Trip", icon: "airplane-outline", route: "/(tabs)/dashboard/Trip" },
    { name: "Matrimonial", icon: "heart-outline", route: "/(tabs)/dashboard/Matrimonial" },
    { name: "Gallery", icon: "images-outline", route: "/(tabs)/dashboard/Gallery" },
    { name: "Association", icon: "people-outline", route: "/(tabs)/dashboard/Events" },
    { name: "Contact US", icon: "people-outline", route: "/(tabs)/dashboard/Contact" },
    { name: "Profile", icon: "person-outline", route: "/(tabs)/dashboard/profile" }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => router.push(item.route)}
          >
            <Ionicons name={item.icon} size={50} color="black" />
            <Text style={styles.menuText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={50} color="black" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  menuItem: {
    margin: 20,
    width:"20%",
    height:"20%",
    
  },
  menuText: {
    marginTop: 5,
    fontSize: 16,
  },
});



