import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import colors from '../constants/colors';
import PracticeCard from '../Components/Cards/Affirmatio.card';
import VisionProgressCard from '../Components/Cards/Progress.card';
import AffirmationCard from '../Components/Cards/Affirmatio.card';

const VisionDetails = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const data = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
  ];

  const practices = [
    {
      id: 1,
      title: 'Morning Gratitude',
      description:
        'Practice gratitude every morning to start your day off on a positive note.',
      time: '5-10 minutes',
    },
    {
      id: 2,
      title: 'Morning Gratitude',
      description:
        'Practice gratitude every morning to start your day off on a positive note.',
      time: '5-10 minutes',
    },
    {
      id: 3,
      title: 'Morning Gratitude',
      description:
        'Practice gratitude every morning to start your day off on a positive note.',
      time: '5-10 minutes',
    },
    {
      id: 4,
      title: 'Morning Gratitude',
      description:
        'Practice gratitude every morning to start your day off on a positive note.',
      time: '5-10 minutes',
    },
  ];

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [200, 50], // Change the output range here
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/premium.jpg')}
        style={[styles.coverImage, { height: headerHeight }]}
      />

      <ScrollView
        style={styles.contentContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        <VisionProgressCard
          title="Morning Gratitude"
          description="Practice gratitude every morning to start your day off on a positive note."
          dayProgress={50}
        />
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Practice</Text>
        </TouchableOpacity>
        <View style={styles.practicesContainer}>
          <Text style={styles.practicesHeading}>Affermations</Text>
          {practices.map(practice => (
            <AffirmationCard
              key={practice.id}
              affirmation={practice.title}
              time={practice.time}
            />
          ))}
        </View>
        <View style={styles.resourcesContainer}>
          <Text style={styles.resourcesHeading}>Resources</Text>
          <View style={styles.resources}>
            <TouchableOpacity style={styles.resource}>
              <Text style={styles.resourceText}>Vision Board Templates</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resource}>
              <Text style={styles.resourceText}>Guided Visualizations</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resource}>
              <Text style={styles.resourceText}>Gratitude Journal Prompts</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    padding: 16,
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
  startButtonText: {
    color: colors.text,
    fontWeight: 'bold',
  },
  practicesContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  practicesHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
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
});

export default VisionDetails;
