import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Linking, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PAT = '16fedda48b8445e8b77a054e1c41759f';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

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
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('สิทธิ์ถูกปฏิเสธ', 'คุณไม่ได้ให้สิทธิ์การเข้าถึงกล้อง');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, 
    });

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImageToClarifai(result.base64); 
    }
  };

  const uploadImageToClarifai = async (base64Image) => {
    setUploading(true); 

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "base64": base64Image
            }
          }
        }
      ]
    });

    try {
      const response = await fetch(
        `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Key ${PAT}`,
            'Content-Type': 'application/json',
          },
          body: raw,
        }
      );

      const resultData = await response.json();
      if (resultData.outputs && resultData.outputs.length > 0) {
        setResult(resultData.outputs[0].data); 
      } else {
        Alert.alert('Error', 'ไม่สามารถดึงข้อมูลจาก AI ได้');
      }
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
          <Text style={styles.result}>ผลลัพธ์จาก AI:</Text>
          {result.regions && result.regions.map((region, index) => (
            <Text key={index} style={styles.resultText}>
              ใบหน้าตรวจจับ: ความแม่นยำ: {region.value ? region.value.toFixed(2) : 'N/A'}
            </Text>
          ))}
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
  resultText: { fontSize: 16, color: '#333' },
});

export default ScanScreen;
