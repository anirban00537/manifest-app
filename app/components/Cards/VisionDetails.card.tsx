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
import {formateDate} from '../../common/functions';

const {width} = Dimensions.get('window');

const VisionBoardUserActivityDetails = ({
  percentage,
  navigation,
  visionDetails,
}: any) => {
  console.log(visionDetails.endDate);
  return (
    <ImageBackground
      source={require('../../assets/premium.jpg')}
      style={styles.backgroundImage}>
      <LinearGradient
        colors={[colors.primaryDark, 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.3)']}
        start={{x: 2, y: 0}}
        end={{x: 0.5, y: 3}}
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
        </TouchableOpacity>
        <View style={styles.circularProgressContainer}>
          <AnimatedCircularProgress
            size={width / 2.0}
            width={3}
            fill={percentage}
            tintColor={colors.primaryDark}
            backgroundColor="#181818"
            backgroundWidth={20}
            lineCap="round"
            duration={1500}
            renderCap={({center}) => (
              <Circle
                cx={center.x}
                cy={center.y}
                r="10"
                fill={colors.primaryLight}
              />
            )}>
            {() => (
              <>
                <Text style={styles.progressText}>{`${percentage}%`}</Text>
                <Text style={styles.targetText}>Daily Target Completed</Text>
              </>
            )}
          </AnimatedCircularProgress>
        </View>

        <Text style={styles.practiceText}>
          Keep practicing to maintain your progress and achieve even greater
          results.
        </Text>

        <Text style={styles.targetDaysText}>
          End Date: {formateDate(visionDetails?.endDate)}
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
    borderBottomEndRadius: 50,
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

  circularProgressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressText: {
    fontSize: 45,
    color: colors.white,
    fontWeight: 'bold',
  },
  targetText: {
    fontSize: 12,
    color: colors.white,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  daysText: {
    fontSize: 26,
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  targetDaysText: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.7,
  },
  practiceText: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.7,
  },
  nextTargetText: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.7,
    marginTop: 10,
  },
});

export default VisionBoardUserActivityDetails;
