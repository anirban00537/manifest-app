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
import AddAffermationModal from '../components/Modal/AddAffermation.modal';
import {Button} from 'react-native-paper';
import AffirmationCard from '../components/Cards/Affirmatio.card';
const practices = [
  {
    id: 1,
    affirmation: 'Morning Gratitude',
    description:
      'Practice gratitude every morning to start your day off on a positive note.',
    time: '5-10 minutes',
    imageSource: 'https://picsum.photos/400',
    date: 'Thursday 2:22pm',
  },
  {
    id: 2,
    affirmation: 'Meditation',
    description: 'Take some time to quiet your mind and focus on your breath.',
    time: '5-20 minutes',
    imageSource: 'https://picsum.photos/300',
    date: 'Thursday 2:22pm',
  },
  {
    id: 3,
    affirmation: 'Journaling',
    description:
      'Write down your thoughts and feelings to gain clarity and insight.',
    time: '10-30 minutes',
    imageSource: 'https://picsum.photos/200',
    date: 'Thursday 2:22pm',
  },
  {
    id: 4,
    affirmation: 'Yoga',
    description:
      'Move your body and connect with your breath in a yoga practice.',
    time: '30-60 minutes',
    imageSource: 'https://picsum.photos/100',
    date: 'Thursday 2:22pm',
  },
  {
    id: 5,
    affirmation: 'Yoga',
    description:
      'Move your body and connect with your breath in a yoga practice.',
    time: '30-60 minutes',
    imageSource: 'https://picsum.photos/500',
    date: 'Thursday 2:22pm',
  },
  {
    id: 6,
    affirmation: 'Yoga',
    description:
      'Move your body and connect with your breath in a yoga practice.',
    time: '30-60 minutes',
    imageSource: 'https://picsum.photos/600',
    date: 'Thursday 2:22pm',
  },
];
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
  const hideModal = () => setVisible(false);
  const handleSaveAffirmation = (affirmation: string, imageurl: string) => {
    setAffirmations([
      ...affirmations,
      {
        affirmation: affirmation,
        imageSource: imageurl,
      },
    ]);
    hideModal();
  };
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
        <TouchableOpacity style={styles.button} onPress={showModal}>
          <Text style={styles.buttonText}>Add Affirmations</Text>
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
              affirmation={affirmation.affirmation}
              date={affirmation.date}
              navigation={navigation}
              imageSource={affirmation.imageSource}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
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
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CreateVisionCard;
