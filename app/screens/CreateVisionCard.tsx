import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import colors from '../constants/colors';
import {useVisionBoardCreate} from '../hooks/visionboard.hook';
import AddAffermationModal from '../components/Modal/AddAffermation.modal';
import AffirmationCard from '../components/Cards/Affirmatio.card';
import Icon from 'react-native-vector-icons/FontAwesome';

const CreateVisionCard = ({navigation}: any) => {
  const {
    createVisionBoard,
    affirmations,
    setAffirmations,
    setTitle,
    setVisible,
    title,
    visible,
  } = useVisionBoardCreate();
  const showModal = () => setVisible(true);
  const [step, setStep] = useState(0);
  const hideModal = () => setVisible(false);
  const handleSaveAffirmation = (affirmation: string, imageurl: string) => {
    setAffirmations([
      ...affirmations,
      {
        _id: new Realm.BSON.ObjectId(),
        title: affirmation,
        url: imageurl,
      },
    ]);
    hideModal();
  };
  const handleSave = () => {
    createVisionBoard(title);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create VisionCard</Text>
      <View style={styles.form}>
        {step === 0 && (
          <>
            <Text style={styles.label}>Board Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setTitle(text)}
              value={title}
              placeholder="Enter title"
            />
            {title && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setStep(1);
                }}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            )}
          </>
        )}
        {step === 1 && (
          <>
            <TouchableOpacity
              style={styles.buttonUploadArea}
              onPress={showModal}>
              <Icon
                name="plus"
                size={20}
                color="white"
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Add Affirmations</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <AddAffermationModal
              visible={visible}
              hideModal={hideModal}
              handleSave={handleSaveAffirmation}
            />
            <View>
              {affirmations?.map((affirmation: any, index: any) => (
                <AffirmationCard
                  key={index}
                  date={affirmation.date}
                  navigation={navigation}
                  image={affirmation.url}
                  title={affirmation.title}
                />
              ))}
            </View>
          </>
        )}
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
    fontSize: 30,
    marginTop: 10,
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
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonUploadArea: {
    backgroundColor: colors.background2,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    height: 120,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  buttonIcon: {
    color: 'white',
    fontSize: 34,
    marginBottom: 10,
  },
  affirmationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  affirmationText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  affirmationImage: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 30,
  },
  saveButton: {
    backgroundColor: colors.success,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 40,
  },
  cancelButton: {
    backgroundColor: colors.danger,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text,
  },
});
export default CreateVisionCard;
