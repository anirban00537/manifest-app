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
import PracticeCard from '../components/Cards/Affirmatio.card';
import VisionProgressCard from '../components/Cards/Progress.card';
import AffirmationCard from '../components/Cards/Affirmatio.card';
import Icon from 'react-native-vector-icons/FontAwesome';

import {FAB, IconButton, Modal, Portal} from 'react-native-paper';
// import {Ionicons} from '@expo/vector-icons';
import AddAffermationModal from '../components/Modal/AddAffermation.modal';
import {
  useGetVisionBoard,
  useGetVisionBoardDetails,
} from '../hooks/visionboard.hook';

const VisionDetails = ({navigation, route}: any) => {
  const {getVisionBoardDetails, visionDetails}: any =
    useGetVisionBoardDetails();
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

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.coverImage,
          {
            height: headerHeight,
          },
        ]}>
        <Image
          source={
            visionDetails?.affirmation[0]?.url
              ? {uri: visionDetails?.affirmation[0].url}
              : require('../assets/premium.jpg')
          }
          style={styles.coverImage}
        />
        <View style={styles.overlay} />
      </Animated.View>
      <View
        style={{
          alignItems: 'flex-end',
          marginRight: 20,
        }}>
        <View style={styles.playButton}>
          <Icon name="play" size={20} color={colors.white} />
        </View>
      </View>
      <ScrollView
        style={styles.contentContainer}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}>
        <VisionProgressCard
          title={visionDetails?.title}
          dayProgress={50}
          targetDays={90}
          achievedDays={85}
        />
        <View>
          <Text style={styles.practicesHeading}>Affermations</Text>
        </View>
        <View>
          {visionDetails?.affirmation?.map((practice: any, index: number) => (
            <AffirmationCard
              key={index}
              affirmation={practice.title}
              date={practice.date}
              navigation={navigation}
              imageSource={practice.url}
            />
          ))}
        </View>
      </ScrollView>
      <AddAffermationModal visible={visible} hideModal={hideModal} />
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
    opacity: 0.5,
  },
  contentContainer: {
    flex: 1,
    padding: 22,
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundImage:
      'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.67) 35%, rgba(0,255,199,0.1) 100%)',
    zIndex: 1,
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
    backgroundColor: colors.secondary,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginTop: -35,
  },
  practicesHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    // marginBottom: 8,
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
