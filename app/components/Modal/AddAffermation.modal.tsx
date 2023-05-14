import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image} from 'react-native';
import {IconButton, Modal, Portal, Button} from 'react-native-paper';
import colors from '../../constants/colors';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddAffermationModal = ({visible, hideModal, handleSave}: any) => {
  const [image, setImage] = useState<any>(null);
  const [affirmation, setAffirmation] = useState('');

  const handleAddAffirmation = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    }).then((response: any) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.path);
      }
    });
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        <Text style={styles.title}>Add New Affirmation</Text>
        {image && (
          <>
            <Image
              source={{uri: image}}
              style={styles.image}
              resizeMode="cover"
            />
            <IconButton
              style={styles.removeImageButton}
              icon={() => <Icon name="close" size={24} color={colors.white} />}
              onPress={handleRemoveImage}
            />
          </>
        )}
        {!image && (
          <IconButton
            style={styles.imagePickerButton}
            icon={() => (
              <Icon name="add-a-photo" size={32} color={colors.white} />
            )}
            onPress={handleAddAffirmation}
          />
        )}
        <TextInput
          style={styles.input}
          value={affirmation}
          onChangeText={setAffirmation}
          placeholder="Type your affirmation here"
          placeholderTextColor={colors.background2}
        />
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            style={styles.cancelButton}
            labelStyle={styles.buttonLabel}
            onPress={() => {
              setAffirmation(''), setImage(null);
              hideModal();
            }}>
            Cancel
          </Button>
          <Button
            mode="contained"
            style={styles.addButton}
            labelStyle={styles.buttonLabel}
            onPress={() => {
              handleSave(affirmation, image);
              setImage(null);
              setAffirmation('');
            }}>
            Add
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.background1,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  imagePickerButton: {
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.secondary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 10,
    fontSize: 18,
    marginBottom: 20,
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.background,
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    width: '45%',
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    width: '45%',
  },
  buttonLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default AddAffermationModal;
