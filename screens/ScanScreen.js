import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Linking, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const API_URL = 'http://127.0.0.1:8000/analyze';  // URL ไปยัง FastAPI ที่รันอยู่

const ScanScreen = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'สิทธิ์ถูกปฏิเสธ',
          'คุณไม่ได้ให้สิทธิ์การเข้าถึงกล้อง, กรุณาเปิดสิทธิ์การเข้าถึงในหน้าตั้งค่า',
          [{ text: 'OK', onPress: () => Linking.openSettings() }]
        );
      }
    })();
  }, []);

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, 
    });

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImageToFastAPI(result.uri);  // อัปโหลดไปยัง FastAPI
    }
  };

  const uploadImageToFastAPI = async (imageUri) => {
    setUploading(true);

    let formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: 'image.jpg',
      type: 'image/jpeg'
    });

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      const resultData = await response.json();
      setResult(resultData.result);  // แสดงผลลัพธ์ที่ได้รับจาก FastAPI

    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'ไม่สามารถอัปโหลดรูปได้');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Upload Image for AI Detection</Text>

      <TouchableOpacity onPress={takeImage} style={styles.button}>
        <Text>ถ่ายรูปด้วยกล้อง</Text>
      </TouchableOpacity>

      {uploading && <ActivityIndicator size="large" color="#0000ff" />}

      {image && <Image source={{ uri: image }} style={styles.image} />}

      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>ผลลัพธ์จาก FastAPI:</Text>
          <Text>{result}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: { padding: 10, backgroundColor: 'blue', borderRadius: 5, marginVertical: 10 },
  image: { width: 300, height: 300, marginTop: 20 },
  resultContainer: { marginTop: 20 },
  result: { fontSize: 18, fontWeight: 'bold', color: 'green' },
});

export default ScanScreen;
