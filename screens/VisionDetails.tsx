import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import colors from '../constants/colors';
import PracticeCard from '../Components/Cards/Affirmatio.card';
import VisionProgressCard from '../Components/Cards/Progress.card';
import AffirmationCard from '../Components/Cards/Affirmatio.card';
import Icon from 'react-native-vector-icons/FontAwesome';

import {FAB, IconButton, Modal, Portal} from 'react-native-paper';
// import {Ionicons} from '@expo/vector-icons';
import AddAffermationModal from '../Components/Modal/AddAffermation.modal';

const VisionDetails = ({navigation}: any) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = React.useState(false);

  const practices = [
    {
      id: 1,
      title: 'Morning Gratitude',
      description:
        'Practice gratitude every morning to start your day off on a positive note.',
      time: '5-10 minutes',
      imageSource: 'https://picsum.photos/400',
      date: 'Thursday 2:22pm',
    },
    {
      id: 2,
      title: 'Meditation',
      description:
        'Take some time to quiet your mind and focus on your breath.',
      time: '5-20 minutes',
      imageSource: 'https://picsum.photos/300',
      date: 'Thursday 2:22pm',
    },
    {
      id: 3,
      title: 'Journaling',
      description:
        'Write down your thoughts and feelings to gain clarity and insight.',
      time: '10-30 minutes',
      imageSource: 'https://picsum.photos/200',
      date: 'Thursday 2:22pm',
    },
    {
      id: 4,
      title: 'Yoga',
      description:
        'Move your body and connect with your breath in a yoga practice.',
      time: '30-60 minutes',
      imageSource: 'https://picsum.photos/100',
      date: 'Thursday 2:22pm',
    },
    {
      id: 5,
      title: 'Yoga',
      description:
        'Move your body and connect with your breath in a yoga practice.',
      time: '30-60 minutes',
      imageSource: 'https://picsum.photos/500',
      date: 'Thursday 2:22pm',
    },
    {
      id: 6,
      title: 'Yoga',
      description:
        'Move your body and connect with your breath in a yoga practice.',
      time: '30-60 minutes',
      imageSource: 'https://picsum.photos/600',
      date: 'Thursday 2:22pm',
    },
  ];
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
          source={require('../assets/premium.jpg')}
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
          title="Morning Gratitude"
          description="Practice gratitude every morning to start your day off on a positive note."
          dayProgress={50}
          targetDays={90}
          achievedDays={85}
        />
        <View>
          {/* <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Add Affermations</Text>
          </TouchableOpacity> */}
          <Text style={styles.practicesHeading}>Affermations</Text>
        </View>
        <View>
          {practices.map(practice => (
            <AffirmationCard
              key={practice.id}
              affirmation={practice.title}
              date={practice.date}
              navigation={navigation}
              imageSource={practice.imageSource}
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
