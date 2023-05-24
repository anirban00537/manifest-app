import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FA from 'react-native-vector-icons/FontAwesome5';

import colors from '../constants/colors';
import VisionDetailsCard from '../components/Cards/VisionDetails.card';
import Visioncard from '../components/Cards/Affirmatio.card';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FAB} from 'react-native-paper';
import AddAffermationModal from '../components/Modal/AddAffermation.modal';
import {useGetVisionBoardDetails} from '../hooks/visionboard.hook';

import Empty from '../components/Cards/Empty.card';
import {useIsFocused} from '@react-navigation/native';
import LoadingScreen from '../components/Loading';

const VisionAffirmations = ({navigation, route}: any) => {
  const isFocused = useIsFocused();

  const {
    getVisionBoardDetails,
    visionDetails,
    addAffirmationToVisionBoard,
    todaysCompletePercentage,
    percentage,
    deleteVisionBoard,
    loading,
    updatePractice,
  }: any = useGetVisionBoardDetails();
  const [visible, setVisible] = React.useState(false);
  const {_id} = route.params;
  useEffect(() => {
    getVisionBoardDetails(_id);
  }, [_id, isFocused]);
  // console.log(visionDetails, 'visionDetailseeeeeeeee');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const handleAddFunction = (affirmation: any, image: any) => {
    addAffirmationToVisionBoard(_id, {
      _id: new Realm.BSON.ObjectId(),
      url: image,
      title: affirmation,
    });
    hideModal();
  };
  if (loading) return <LoadingScreen />;
  return (
    <View style={styles.container}>
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
        <Text style={styles.title}>Vision Card</Text>
        <TouchableOpacity style={styles.addButton} onPress={showModal}>
          <Icon name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.contentContainer} scrollEventThrottle={16}>
        <View
          style={{
            marginHorizontal: 15,
          }}>
          <View>
            {visionDetails?.affirmation?.length === 0 && (
              <Empty msg={'No Visionboard'} />
            )}
            {visionDetails?.affirmation?.length > 0 && (
              <View style={styles.cardsContainer}>
                {visionDetails?.affirmation?.map(
                  (affirmation: any, index: number) => (
                    <Visioncard
                      key={index}
                      date={affirmation?.createdAt}
                      image={affirmation.url}
                      affirmation={affirmation}
                      title={affirmation.title}
                    />
                  ),
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <AddAffermationModal
        visible={visible}
        hideModal={hideModal}
        handleSave={handleAddFunction}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // marginHorizontal: 20,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.8,
  },
  contentContainer: {
    flex: 1,
    // padding: 22,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 90,
  },

  startButton: {
    backgroundColor: colors.primary,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignSelf: 'center',
    marginVertical: 16,
  },

  startButtonText: {
    color: colors.text,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
  practicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 90,
  },

  practicesHeading: {
    fontSize: 22,
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10,
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
  },
  resourcesContainer: {
    marginBottom: 24,
  },
  resourcesHeading: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
    marginBottom: 8,
  },
  resources: {
    backgroundColor: colors.background2,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  resource: {
    paddingVertical: 8,
  },
  resourceText: {
    color: colors.text,
    fontFamily: 'Poppins-Regular',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primaryDark,
    color: colors.text,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backButtonIcon: {
    marginRight: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    color: colors.white,
    textTransform: 'uppercase',
  },
  addButton: {
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VisionAffirmations;
