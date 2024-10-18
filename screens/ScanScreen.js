import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const ScanScreen = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('ขออภัย เราต้องการการอนุญาตเพื่อเข้าถึงแกลเลอรี่ของคุณ!');
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images-ext-1.discordapp.net/external/xEB0SEHuO8ZokkNlfcm9mqv0oMSMkKtaGSFfViiKsWI/%3Fse%3D2024-10-18T10%253A07%253A09Z%26sp%3Dr%26sv%3D2024-08-04%26sr%3Db%26rscc%3Dmax-age%253D604800%252C%2520immutable%252C%2520private%26rscd%3Dattachment%253B%2520filename%253D8171ec79-bd22-40f2-acf1-46cbd178cdc0.webp%26sig%3DCSkUiRpXoKL2mrnCha0en9g1hcjD2P%252BwuS%252BQX3BlLEU%253D/https/files.oaiusercontent.com/file-4Vuu4sNNGsgJC8M4VFOxOYCm?format=webp&width=662&height=662' }} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Upload Image for AI Detection</Text>

        <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
          <Icon name="image-outline" size={30} color="#fff" />
          <Text style={styles.buttonText}>เลือกรูปจากแกลเลอรี่</Text>
        </TouchableOpacity>

        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.imageText}>รูปที่เลือกมา:</Text>
          </View>
        )}
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // เปลี่ยนเป็นสีขาวเพื่อให้เด่นขึ้นบนพื้นหลัง
    marginBottom: 20,
    textAlign: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20, // เพิ่มระยะห่างด้านล่างปุ่ม
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imageContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageText: {
    fontSize: 16,
    color: '#fff', // เปลี่ยนสีให้เข้ากับพื้นหลัง
  },
});

export default ScanScreen;
