import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../constants/colors';

const AffirmationDetailsAndEdit = ({route}: any) => {
  const navigation = useNavigation();

  const [editedAffirmation, setEditedAffirmation] = useState(
    'I am a legend and i am the best in this world',
  );
  const affirmationInputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    affirmationInputRef.current?.focus();
  }, []);

  const handleSave = () => {
    Keyboard.dismiss();
    // Save the edited affirmation
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Affirmation',
      'Are you sure you want to delete this affirmation?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Delete the affirmation
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://picsum.photos/200',
        }}
        style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <TextInput
            ref={affirmationInputRef}
            style={styles.affirmationInput}
            multiline={true}
            onChangeText={text => setEditedAffirmation(text)}
            value={editedAffirmation}
            autoFocus={true}
            placeholderTextColor="#ccc"
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end',
  },
  affirmationInput: {
    fontSize: 24,
    color: 'white',
    textAlignVertical: 'bottom',
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
  },
  deleteButton: {
    backgroundColor: colors.danger,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignSelf: 'center',
    marginVertical: 16,
  },
  saveButton: {
    backgroundColor: colors.primary,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignSelf: 'center',
    marginVertical: 16,

    // marginLeft: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AffirmationDetailsAndEdit;
