import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import colors from '../constants/colors';
import VisionDetailsCard from '../components/Cards/VisionDetails.card';
import AffirmationCard from '../components/Cards/Affirmatio.card';
import Icon from 'react-native-vector-icons/FontAwesome';

import {FAB} from 'react-native-paper';

import AddAffermationModal from '../components/Modal/AddAffermation.modal';
import {useGetVisionBoardDetails} from '../hooks/visionboard.hook';
import {TouchableOpacity} from 'react-native-gesture-handler';

const VisionDetails = ({navigation, route}: any) => {
  const {
    getVisionBoardDetails,
    visionDetails,
    addAffirmationToVisionBoard,
  }: any = useGetVisionBoardDetails();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = React.useState(false);
  const {_id} = route.params;
  useEffect(() => {
    getVisionBoardDetails(_id);
  }, [_id]);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [200, 50], // Change the output range here
    extrapolate: 'clamp',
  });
  console.log(visionDetails?.affirmation, 'visionDetails?.affirmation');
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
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.contentContainer}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <VisionDetailsCard totalAffirmations={50} targetDays={100} />

        <View style={{alignItems: 'center'}}>
          <View style={styles.playButton}>
            <Icon name="play" size={20} color={colors.white} />
            <Text style={styles.playButtonText}>Play</Text>
          </View>
        </View>

        <View style={{padding: 15}}>
          <View style={styles.header}>
            <Text style={styles.title}>{visionDetails?.title}</Text>
          </View>
          <View>
            <Text style={styles.practicesHeading}>Affermations</Text>
          </View>
          <View>
            {visionDetails?.affirmation?.map(
              (affirmation: any, index: number) => (
                <AffirmationCard
                  key={index}
                  affirmation={affirmation.title}
                  date={new Date(affirmation.createdAt).toLocaleString()}
                  navigation={navigation}
                  imageSource={affirmation.url}
                />
              ),
            )}
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: colors.text,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
  },
  practicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 90,
  },
  playButton: {
    backgroundColor: colors.primary,
    width: 158,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: -50,
  },
  practicesHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10,
  },
  resourcesContainer: {
    marginBottom: 24,
  },
  resourcesHeading: {
    fontSize: 18,
    fontWeight: 'bold',
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
