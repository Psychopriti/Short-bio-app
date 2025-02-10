import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const ProfileScreen = () => {
  const [profile, setProfile] = useState({
    picture: null,
    firstName: '',
    lastName: '',
    dob: '',
    nationality: '',
    bio: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const savedProfile = storage.getString('profile');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
  };

  const validateFields = () => {
    let newErrors = {};
    if (!profile.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!profile.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!profile.dob.trim()) newErrors.dob = 'Date of birth is required';
    if (!profile.nationality.trim()) newErrors.nationality = 'Nationality is required';
    if (!profile.bio.trim()) newErrors.bio = 'Bio is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveProfile = () => {
    if (validateFields()) {
      storage.set('profile', JSON.stringify(profile));
      setModalVisible(false);
    } else {
      Alert.alert('Validation Error', 'Please fill in all required fields');
    }
  };

  const pickImage = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission required to access gallery!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfile({ ...profile, picture: result.assets[0].uri });
    }
  };

  return (
    <View style={styles.container}>
      {profile.picture ? (
        <Image source={{ uri: profile.picture }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}><Text>No Image</Text></View>
      )}

      <Text style={styles.text}>{profile.firstName} {profile.lastName}</Text>
      <Text style={styles.text}>{profile.dob || "Date of Birth: Not Set"}</Text>
      <Text style={styles.text}>{profile.nationality}</Text>
      <Text style={styles.text}>{profile.bio}</Text>

      <Button title="Edit Profile" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType="slide">
        <Image source={{ uri: profile.picture }} style={styles.image2} />
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={styles.textTitle}>Change Profile Picture</Text>
          </TouchableOpacity>

          <TextInput 
            placeholder="First Name" 
            value={profile.firstName} 
            onChangeText={(text) => setProfile({ ...profile, firstName: text })} 
            style={styles.input} 
          />
          {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

          <TextInput 
            placeholder="Last Name" 
            value={profile.lastName} 
            onChangeText={(text) => setProfile({ ...profile, lastName: text })} 
            style={styles.input} 
          />
          {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

          <TextInput 
            placeholder="Date of Birth" 
            value={profile.dob} 
            onChangeText={(text) => setProfile({ ...profile, dob: text })} 
            style={styles.input} 
          />
          {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

          <TextInput 
            placeholder="Nationality" 
            value={profile.nationality} 
            onChangeText={(text) => setProfile({ ...profile, nationality: text })} 
            style={styles.input} 
          />
          {errors.nationality && <Text style={styles.errorText}>{errors.nationality}</Text>}

          <TextInput 
            placeholder="Short Bio" 
            value={profile.bio} 
            onChangeText={(text) => setProfile({ ...profile, bio: text })} 
            multiline 
            style={[styles.input, styles.bioInput]} 
          />
          {errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}

          <Button title="Save" onPress={saveProfile} />
        </View>
        <Button title="Cancel" onPress={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 20 
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10 
  },
  image2:{
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  text: { 
    fontSize: 16, 
    marginBottom: 5 
  },
  textTitle: {
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 10,
  },
  input: { 
    width: '80%', 
    padding: 10, 
    borderWidth: 1, 
    marginBottom: 10, 
    borderRadius: 5, 
    textAlign: 'center'
  },
  modalContent: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  bioInput: {
  height: 80, // Adjust height for better multiline display
  textAlignVertical: 'top', // Aligns text to the top
},
});

export default ProfileScreen;
