import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Image} from 'react-native';
import {IconButton, Modal, Portal, Button} from 'react-native-paper';
import colors from '../../constants/colors';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddAffermationModal = ({visible, hideModal, handleSave}: any) => {
  const [image, setImage] = useState<any>(null);
  const [affirmation, setAffirmation] = useState('');
  const [showImage, setShowImage] = useState(!!image);

  const handleAddAffirmation = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    }).then((response: any) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImage(response.path);
        setShowImage(true);
      }
    });
  };

  const handleRemoveImage = () => {
    setImage(null);
    setShowImage(false);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        <Text style={styles.title}>Add New Affirmation</Text>
        {showImage && (
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
        {!showImage && (
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
          onChangeText={text => setAffirmation(text)}
          placeholder="Type your affirmation here"
          placeholderTextColor={colors.white}
        />
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            style={{
              backgroundColor: colors.danger,
            }}
            labelStyle={{color: colors.white}}
            onPress={hideModal}>
            Cancel
          </Button>
          <Button
            mode="contained"
            style={{backgroundColor: colors.primary}}
            labelStyle={{color: colors.white}}
            onPress={() => {
              handleSave(affirmation, image);
              setImage(null);
              setAffirmation('');
            }}>
            Add Affirmation
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: colors.background,
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.white,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.background2,
    borderRadius: 5,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  imagePickerButton: {
    backgroundColor: colors.primary,
    height: 80,
    width: 80,
    borderRadius: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  image: {
    height: 200,
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.background,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageIcon: {
    color: colors.white,
    fontSize: 24,
  },
});

export default AddAffermationModal;
