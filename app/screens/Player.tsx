import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  StyleSheet,
} from 'react-native';

const {width} = Dimensions.get('window');

const affirmations = [
  {
    image: require('../assets/adaptive-icon.png'),
    text: 'You are amazing',
  },
  {
    image: require('../assets/canvas.png'),
    text: 'You can achieve anything',
  },
  {
    image: require('../assets/premium.jpg'),
    text: 'You are worthy of love and happiness',
  },
];

const Player = () => {
  const [currentDetails, setCurrentDetails] = useState(affirmations[0]);
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentIndex = affirmations.indexOf(currentDetails);
      const nextIndex = (currentIndex + 1) % affirmations.length;
      setCurrentDetails(affirmations[nextIndex]);
      console.log('@@@@@@@@@@@');
    }, 2500);

    return () => clearTimeout(timer);
  }, [currentDetails]);

  useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, [currentDetails]);

  return (
    <View style={styles.container}>
      <View style={styles.slide}>
        <Animated.Image
          source={currentDetails.image}
          style={[styles.image, {opacity: opacityValue}]}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{currentDetails.text}</Text>
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
