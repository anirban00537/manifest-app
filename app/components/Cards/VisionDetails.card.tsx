import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Circle} from 'react-native-svg';
import FA from 'react-native-vector-icons/FontAwesome5';
import colors from '../../constants/colors';

const {width} = Dimensions.get('window');

const VisionBoardUserActivityDetails = ({days, navigation}: any) => {
  const remainingPercentage = 100 - (days?.completedPercentage ?? 0);
  console.log(days, 'daysdays');
  return (
    <ImageBackground
      source={require('../../assets/premium.jpg')}
      style={styles.backgroundImage}>
      <LinearGradient
        colors={[colors.primary, 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.3)']}
        start={{x: 2, y: 0}}
        end={{x: 0, y: 3}}
        style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <FA
            name="arrow-left"
            size={20}
            color="white"
            style={styles.backButtonIcon}
          />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <View style={styles.circularProgressContainer}>
          <AnimatedCircularProgress
            size={width / 2.2}
            width={10}
            fill={days?.completedPercentage}
            tintColor="#5bc5a7"
            backgroundColor="#181818"
            backgroundWidth={20}
            lineCap="round"
            duration={1500}
            renderCap={({center}) => (
              <Circle cx={center.x} cy={center.y} r="10" fill="#5bc5a7" />
            )}>
            {() => (
              <>
                <Text style={styles.progressText}>{`${days.daysBetween}`}</Text>
                <Text style={styles.targetText}>Day's Remaining</Text>
              </>
            )}
          </AnimatedCircularProgress>
        </View>
        <View style={styles.daysContainer}>
          <Text style={styles.daysText}>{`55`}</Text>
          <Text style={styles.targetDaysText}>{`Total practice sessions`}</Text>
        </View>
        <Text style={styles.practiceText}>
          Keep practicing to achieve optimal results.
        </Text>
      </LinearGradient>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  backButtonIcon: {
    marginRight: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  circularProgressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  targetText: {
    fontSize: 13,
    color: colors.white,
    // opacity: 0.7,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  daysText: {
    fontSize: 44,
    color: '#fff',
    fontWeight: 'bold',
  },
  targetDaysText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.7,
    marginLeft: 5,
  },
  practiceText: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default VisionBoardUserActivityDetails;
