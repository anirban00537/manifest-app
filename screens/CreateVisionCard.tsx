import React, {useCallback, useState} from 'react';
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
import ImageUploader from '../Components/Affermation/AddAffermation';
import {RealmContext} from '../models';
import {VisionCard} from '../models/visioncard.model';
const {useRealm} = RealmContext;

const CreateVisionCard = () => {
  const realm = useRealm();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleCreateVisionCard = useCallback(
    (description: string, title: string): void => {
      if (!description) {
        return;
      }

      // Everything in the function passed to "realm.write" is a transaction and will
      // hence succeed or fail together. A transcation is the smallest unit of transfer
      // in Realm so we want to be mindful of how much we put into one single transaction
      // and split them up if appropriate (more commonly seen server side). Since clients
      // may occasionally be online during short time spans we want to increase the probability
      // of sync participants to successfully sync everything in the transaction, otherwise
      // no changes propagate and the transaction needs to start over when connectivity allows.
      realm.write(() => {
        return new VisionCard(realm, description, title);
      });
    },
    [realm, title, description],
  );

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
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          onChangeText={text => setDescription(text)}
          value={description}
          multiline={true}
          placeholder="Enter description"
        />
        {imageUrl !== '' && (
          <Image source={{uri: imageUrl}} style={styles.imagePreview} />
        )}
        {/* <ImageUploader /> */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            handleCreateVisionCard(description, title);
          }}>
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
