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

const VisionDetails = ({navigation, route}: any) => {
  const {
    getVisionBoardDetails,
    visionDetails,
    addAffirmationToVisionBoard,
    getDaysBetweenDates,
    deleteVisionBoard,
  }: any = useGetVisionBoardDetails();
  const [visible, setVisible] = React.useState(false);
  const {_id} = route.params;
  useEffect(() => {
    getVisionBoardDetails(_id);
  }, [_id]);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const handleEditFunction = (affirmation: any, image: any) => {
    addAffirmationToVisionBoard(_id, {
      _id: new Realm.BSON.ObjectId(),
      url: image,
      title: affirmation,
    });
    hideModal();
  };
  console.log(
    getDaysBetweenDates(visionDetails?.createdAt, visionDetails?.endDate),
    'createdAt?.affirmation',
  );
  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer} scrollEventThrottle={16}>
        <VisionDetailsCard
          totalAffirmations={50}
          targetDays={100}
          days={getDaysBetweenDates(
            visionDetails?.createdAt,
            visionDetails?.endDate,
          )}
          navigation={navigation}
        />
        <View style={styles.header}>
          <Text style={styles.title}>{visionDetails?.title}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.MoreButton}
            onPress={() => {
              deleteVisionBoard(_id, navigation);
            }}>
            <Icon name="trash" size={20} color={colors.white} />
            <Text style={styles.playButtonText}>Trash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => {
              navigation.navigate('AuthenticatedStack', {
                screen: 'Player',
                params: {_id: _id},
              });
            }}>
            <Icon name="play" size={20} color={colors.white} />
            <Text style={styles.playButtonText}>Start Movie</Text>
          </TouchableOpacity>
        </View>

        <View style={{padding: 15}}>
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
                    title={affirmation.title}
                  />
                ),
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <AddAffermationModal
        visible={visible}
        hideModal={hideModal}
        handleSave={handleEditFunction}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        label="Add Affirmation"
        onPress={showModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
  },
  heading: {
    fontSize: 24,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
    marginVertical: 16,
    alignSelf: 'center',
    position: 'absolute',
    top: 80,
    textAlign: 'center',
    width: '100%',
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
  playButtonText: {
    color: colors.white,
    marginLeft: 10,
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
  buttonContainer: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  playButton: {
    backgroundColor: colors.primaryDark,
    width: '48%',
    height: 48,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  MoreButton: {
    backgroundColor: colors.background1,
    elevation: 10,
    width: '48%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },

  practicesHeading: {
    fontSize: 17,
    // fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
    fontFamily: 'Poppins-SemiBold',
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
    backgroundColor: colors.primary,
    color: colors.text,
  },
});

export default VisionDetails;
