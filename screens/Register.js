import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileScreen from './ProfileScreen';

const HomeScreen = ({ navigation, handleLogout }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Waste Eye</Text>

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={styles.ProfileButton}
          onPress={() => navigation.navigate('ProfileScreen')}
        >
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  ProfileButton: {
    flex: 1,
    height: 120,
    paddingLeft: 16,
    paddingTop: 16,
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    width: '100%',
    padding: 16,
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;