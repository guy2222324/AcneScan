import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { initializeApp } from '@firebase/app';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import ScanScreen from './screens/ScanScreen';

const firebaseConfig = {
  apiKey: "AIzaSyBuBV8YMp9bH88jqtRIb4zrnOEddfVueIs",
  authDomain: "fir-auth-tutorial-703ce.firebaseapp.com",
  projectId: "fir-auth-tutorial-703ce",
  storageBucket: "fir-auth-tutorial-703ce.appspot.com",
  messagingSenderId: "592016365775",
  appId: "1:592016365775:web:c78f8c65ba2ef4c8f13fba",
  measurementId: "G-4S0XJDCPKQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// HomeStack ไม่มีปุ่ม Logout
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ScanScreen" component={ScanScreen} />
    </Stack.Navigator>
  );
}

// ProfileStack มีปุ่ม Logout
function ProfileStack({ user, handleLogout }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="ProfileScreen">
          {(props) => <ProfileScreen {...props} handleLogout={handleLogout} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // อัปเดตสถานะผู้ใช้เมื่อทำการ Logout
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'ProfileTab') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'ScanTab') {
              iconName = focused ? 'scan' : 'scan-outline'; 
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3498db',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeStack} />
        <Tab.Screen name="ScanTab" component={ScanScreen} />
        <Tab.Screen name="ProfileTab">
          {(props) => <ProfileStack {...props} user={user} handleLogout={handleLogout} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}