import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://images-ext-1.discordapp.net/external/xEB0SEHuO8ZokkNlfcm9mqv0oMSMkKtaGSFfViiKsWI/%3Fse%3D2024-10-18T10%253A07%253A09Z%26sp%3Dr%26sv%3D2024-08-04%26sr%3Db%26rscc%3Dmax-age%253D604800%252C%2520immutable%252C%2520private%26rscd%3Dattachment%253B%2520filename%253D8171ec79-bd22-40f2-acf1-46cbd178cdc0.webp%26sig%3DCSkUiRpXoKL2mrnCha0en9g1hcjD2P%252BwuS%252BQX3BlLEU%253D/https/files.oaiusercontent.com/file-4Vuu4sNNGsgJC8M4VFOxOYCm?format=webp&width=662&height=662' }} 
      style={styles.background}
    >
      {/* ข้อความต้อนรับ */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to Waste Eye</Text>

        {/* ปุ่มสำหรับกด Scan */}
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate('ScanScreen')}
        >
          <Icon name="scan-outline" size={30} color="#fff" />
          <Text style={styles.buttonText}>Scan Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // เพิ่มพื้นหลังโปร่งใสบนข้อความและปุ่ม
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: '#000', // เพิ่มเงาให้ข้อความ
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6347', // เปลี่ยนสีปุ่มให้สดใสขึ้น
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default HomeScreen;
