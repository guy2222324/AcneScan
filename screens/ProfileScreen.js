import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth, signOut } from 'firebase/auth';

const ProfileScreen = ({ handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Icon name="person-circle-outline" size={100} color="#3498db" style={styles.icon} />
        <Text style={styles.title}>
          {user ? user.displayName || 'Waste Eye' : 'Loading...'}
        </Text>
        <Text style={styles.subtitle}>
          {user ? user.email : 'Loading...'}
        </Text>
        <View style={styles.infoContainer}>
          <Icon name="location-outline" size={24} color="#34495e" />
          <Text style={styles.infoText}>Bangkok, Thailand</Text>
        </View>
        <View style={styles.infoContainer}>
          <Icon name="calendar-outline" size={24} color="#34495e" />
          <Text style={styles.infoText}>Joined: January 2024</Text>
        </View>
        
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Add Logout button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f2f6',
  },
  card: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#34495e',
    marginLeft: 10,
  },
  editButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#3498db',
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;