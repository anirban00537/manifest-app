import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useGetVisionBoardDetails} from '../hooks/visionboard.hook';
import Tts from 'react-native-tts';
import {ProgressBar} from 'react-native-paper';
import colors from '../constants/colors';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');
const Player = ({navigation, route}: any) => {
  useKeepAwake();

  const {getVisionBoardDetails, visionDetails, loading, updatePractice}: any =
    useGetVisionBoardDetails();
  const {_id} = route.params;

  useEffect(() => {
    getVisionBoardDetails(_id);
  }, [_id]);

  const time = 8000;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(time);
  const [firstLoopCompleted, setFirstLoopCompleted] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(
        (currentIndex + 1) % (visionDetails?.affirmation.length || 1),
      );
      setRemainingTime(time);
    }, time);

    return () => clearInterval(intervalId);
  }, [currentIndex, visionDetails]);

  useEffect(() => {
    if (currentIndex === visionDetails?.affirmation.length - 1) {
      setFirstLoopCompleted(true);
    }
  }, [currentIndex, visionDetails]);

  const currentDetails = visionDetails?.affirmation[currentIndex];

  const speakNextImage = () => {
    if (currentDetails?.title) {
      Tts.speak(currentDetails?.title);
      Tts.setDefaultRate(0.5789);
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.5,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(speakNextImage);
    });

    const timerId = setInterval(() => {
      setRemainingTime(prevRemainingTime =>
        Math.max(0, prevRemainingTime - 80),
      );
    }, 80);

    return () => {
      Tts.stop();
      clearInterval(timerId);
    };
  }, [currentIndex, visionDetails, fadeAnim, scaleAnim]);

  const handleEndSession = () => {
    navigation.goBack();
  };

  if (loading) return <Text>loading</Text>;
  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <ProgressBar
          progress={(time - remainingTime) / time}
          color={colors.white}
          style={styles.progressBar}
        />
      </View>
      <View style={styles.slide}>
        <Animated.Image
          source={{uri: currentDetails?.url}}
          style={[
            styles.image,
            {opacity: fadeAnim, transform: [{scale: scaleAnim}]},
          ]}
        />
        <View style={styles.overlay} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{currentDetails?.title}</Text>
        </View>
      </View>
      {firstLoopCompleted && (
        <TouchableOpacity
          style={styles.endSessionButton}
          onPress={handleEndSession}>
          <Icon name="stop" size={24} color={colors.white} />
          <Text style={styles.stopText}>End Session</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  slide: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 0,
  },
  textContainer: {
    position: 'absolute',
    alignSelf: 'center',
    padding: 20,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progressBarContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  endSessionButton: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: colors.primary,
    borderRadius: 50,
    padding: 12,
    zIndex: 2,
    elevation: 3, // Added elevation to ensure the button appears above the image
  },
  stopText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.white,
  },
});

export default Player;
