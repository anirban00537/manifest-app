import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Dimensions, Animated, StyleSheet} from 'react-native';
import {useGetVisionBoardDetails} from '../hooks/visionboard.hook';
import Tts from 'react-native-tts';

const {width} = Dimensions.get('window');
const Player = ({navigation, route}: any) => {
  const {getVisionBoardDetails, visionDetails}: any =
    useGetVisionBoardDetails();
  const {_id} = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial value for scale: 1

  useEffect(() => {
    getVisionBoardDetails(_id);
  }, [_id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(
        (currentIndex + 1) % (visionDetails?.affirmation.length || 1),
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentIndex, visionDetails]);

  const currentDetails = visionDetails?.affirmation[currentIndex];

  const speakNextImage = () => {
    if (currentDetails?.title) {
      Tts.speak(currentDetails?.title);
    }
  };

  useEffect(() => {
    // Animate opacity and scale when the image changes
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

    return () => {
      // Stop TTS if component unmounts or image changes
      Tts.stop();
    };
  }, [currentIndex, visionDetails, fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.slide}>
        <Animated.Image
          source={{uri: currentDetails?.url}}
          style={[
            styles.image,
            {opacity: fadeAnim, transform: [{scale: scaleAnim}]},
          ]}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{currentDetails?.title}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Player;
