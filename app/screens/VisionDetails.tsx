import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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

const VisionDetails = ({navigation, route}: any) => {
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
      <ScrollView style={styles.contentContainer} scrollEventThrottle={16}>
        <VisionDetailsCard
          percentage={percentage}
          visionDetails={visionDetails}
          navigation={navigation}
          updatePractice={updatePractice}
          _id={_id}
          deleteVisionBoard={deleteVisionBoard}
        />
        <View
          style={{
            marginHorizontal: 15,
          }}>
          <View>
            <View>
              <Text style={styles.practicesHeading}>Vision Cards</Text>
            </View>
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

      <FAB style={styles.fab} icon="plus" color="white" onPress={showModal} />
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
});

export default VisionDetails;
