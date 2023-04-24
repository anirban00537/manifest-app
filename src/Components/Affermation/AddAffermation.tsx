import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import colors from '../../constants/colors';

const ImageUploader = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [affirmation, setAffirmation] = useState('');
  const [imageList, setImageList] = useState<any>([]);

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleAdd = () => {
    if (image && affirmation) {
      const newImage = {
        id: uuidv4(),
        imageUri: image,
        affirmation,
      };
      setImageList([...imageList, newImage]);
      setImage(null);
      setAffirmation('');
      Keyboard.dismiss();
    }
  };

  const handleRemove = (id: any) => {
    const updatedImageList = imageList.filter((image: any) => image.id !== id);
    setImageList(updatedImageList);
  };

  const renderImageItem = ({ item }: any) => (
    <View style={styles.imageItem}>
      <Image source={{ uri: item.imageUri }} style={styles.imagePreview} />
      <Text style={styles.affirmationText}>{item.affirmation}</Text>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemove(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.form}>
          <TouchableOpacity style={styles.pickImageButton} onPress={pickImage}>
            <Text style={styles.buttonText}>Pick an image</Text>
          </TouchableOpacity>
          {image && (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          )}
          <Text style={styles.label}>Affirmation</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            onChangeText={text => setAffirmation(text)}
            value={affirmation}
            multiline={true}
            placeholder="Enter affirmation"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        {imageList.length > 0 && (
          <View style={styles.imageListContainer}>
            <Text style={styles.listTitle}>Image List</Text>
            <FlatList
              data={imageList}
              renderItem={renderImageItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.imageList}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  pickImageButton: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: colors.green,
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  removeButton: {
    backgroundColor: colors.danger,
    padding: 5,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  imageItem: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  affirmationText: {
    fontSize: 16,
    marginBottom: 10,
  },
  removeButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageListContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageList: {
    paddingBottom: 20,
  },
});
export default ImageUploader;
