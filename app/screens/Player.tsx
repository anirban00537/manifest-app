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
  const fadeAnim = useRef(new Animated.Value(5)).current; // Initial value for opacity: 0

  useEffect(() => {
    getVisionBoardDetails(_id);
  }, [_id]);
  const speakNextImage = () => {
    setTimeout(async () => {
      if (currentDetails?.title) {
        await Tts.speak(currentDetails?.title);
        await Tts.addEventListener('tts-finish', event => {
          setCurrentIndex(
            (currentIndex + 1) % (visionDetails?.affirmation.length || 1),
          );
        });
      }
    }, 1500);
  };
  useEffect(() => {
    speakNextImage();
  }, [currentIndex, visionDetails]);
  useEffect(() => {
    return () => {
      Tts.stop();
    };
  }, []);
  const currentDetails = visionDetails?.affirmation[currentIndex];

  return (
    <View style={styles.container}>
      <View style={styles.slide}>
        <Animated.Image
          source={{uri: currentDetails?.url}}
          style={[styles.image, {opacity: fadeAnim}]}
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
