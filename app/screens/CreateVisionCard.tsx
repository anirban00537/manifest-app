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
import DatePicker from '../components/Datepicker';
import FA from 'react-native-vector-icons/FontAwesome5';
import Empty from '../components/Cards/Empty.card';

const CreateVisionCard = ({navigation}: any) => {
  const {
    createVisionBoard,
    affirmations,
    setAffirmations,
    setTitle,
    setVisible,
    title,
    visible,
    endDate,
    daily_target,
    setDaily_target,
    setendDate,
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
  const handleEndDate = (date: any) => {
    setendDate(date);
  };

  const handlePlus = () => {
    setDaily_target(daily_target + 1);
  };

  const handleMinus = () => {
    if (daily_target > 0) {
      setDaily_target(daily_target - 1);
    }
  };

  const handleSave = () => {
    createVisionBoard(title);
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 22,
          height: 80,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <FA
            name="arrow-left"
            size={20}
            color="white"
            style={styles.backButtonIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Create Visionboard</Text>
        <TouchableOpacity
          disabled={
            !title || !endDate || affirmations.length <= 0 ? true : false
          }
          style={styles.addButton}
          onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Board Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder="Enter title"
          placeholderTextColor={colors.white}
        />

        <View style={styles.datePickerContainer}>
          <Text style={styles.label}>End Date</Text>
          <DatePicker onDateSelect={handleEndDate} />
        </View>

        <View style={styles.dailyTargetContainer}>
          <Text style={styles.label}>Daily Target</Text>
          <View style={styles.targetBox}>
            <TouchableOpacity style={styles.plusButton} onPress={handlePlus}>
              <Icon name="plus" size={20} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.targetText}>{daily_target}</Text>
            <TouchableOpacity style={styles.minusButton} onPress={handleMinus}>
              <Icon name="minus" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.affirmationContainer}>
        <TouchableOpacity
          style={styles.addAffirmationButton}
          onPress={() => showModal()}>
          <Icon name="plus" size={20} color={colors.white} />
          <Text style={styles.addAffirmationButtonText}>Add Affirmation</Text>
        </TouchableOpacity>

        {affirmations.length === 0 && (
          <View style={styles.emptyContainer}>
            <Empty
              msg={'No Affirmations'}
              msgSmall={' '}
              width={110}
              height={110}
              fontSize={21}
            />
          </View>
        )}

        {affirmations.map((affirmation, index) => (
          <AffirmationCard
            key={index}
            date={affirmation.date}
            navigation={navigation}
            image={affirmation.url}
            title={affirmation.title}
          />
        ))}
      </View>

      <AddAffermationModal
        visible={visible}
        hideModal={hideModal}
        handleSave={handleSaveAffirmation}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    color: colors.white,
    textTransform: 'uppercase',
  },
  form: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.white,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: colors.white,
    borderWidth: 0.3,
    borderColor: colors.grayText,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  backButtonIcon: {
    marginRight: 5,
  },
  addButton: {
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  affirmationContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  addAffirmationButton: {
    backgroundColor: colors.background,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  addAffirmationButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  dailyTargetContainer: {
    marginBottom: 20,
  },
  targetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.3,
    borderColor: colors.grayText,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  plusButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 10,
  },
  minusButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 10,
  },
  targetText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateVisionCard;
