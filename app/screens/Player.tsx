import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';
import {useGetVisionBoardDetails} from '../hooks/visionboard.hook';

const {width} = Dimensions.get('window');
const Player = ({navigation, route}: any) => {
  const {getVisionBoardDetails, visionDetails}: any =
    useGetVisionBoardDetails();
  const {_id} = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    getVisionBoardDetails(_id);
  }, [_id]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(
        (currentIndex + 1) % (visionDetails?.affirmation.length || 1),
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex, visionDetails]);

  const currentDetails = visionDetails?.affirmation[currentIndex];

  useEffect(() => {
    // Animate opacity when the image changes
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, [currentIndex, visionDetails, fadeAnim]);

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
