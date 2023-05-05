import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../constants/colors';
import {useVisionBoardCreate} from '../hooks/visionboard.hook';
import AddAffermationModal from '../Components/Modal/AddAffermation.modal';
import {Button} from 'react-native-paper';

const CreateVisionCard = () => {
  const [visible, setVisible] = React.useState(false);

  const {createVisionBoard} = useVisionBoardCreate();
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const handleSave = () => {
    createVisionBoard(title);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Vision Board Card</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setTitle(text)}
          value={title}
          placeholder="Enter title"
        />
        {imageUrl !== '' && (
          <Image source={{uri: imageUrl}} style={styles.imagePreview} />
        )}
        <Button onPress={showModal}>Add</Button>
        <AddAffermationModal visible={visible} hideModal={hideModal} />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text,
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.text,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    color: colors.text,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CreateVisionCard;
