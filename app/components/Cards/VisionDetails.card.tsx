import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Circle} from 'react-native-svg';
import FA from 'react-native-vector-icons/FontAwesome5';

const VisionBoardUserActivityDetails = ({
  totalAffirmations,
  targetDays,
  navigation,
}: any) => {
  const progress = 50; // This is just an example value for demonstration purposes

  return (
    <LinearGradient
      colors={[colors.primaryDark, 'black']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <FA
          name="arrow-left"
          size={20}
          color={colors.text}
          onPress={() => navigation.canGoBack()}
          style={styles.backButtonIcon}
        />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View
        style={{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
        <AnimatedCircularProgress
          size={160}
          width={10}
          fill={progress}
          tintColor={colors.green}
          backgroundColor={colors.dark1}
          // rotation={-115}
          backgroundWidth={20}
          lineCap="round"
          // arcSweepAngle={240}
          duration={1500}
          renderCap={({center}) => (
            <Circle cx={center.x} cy={center.y} r="10" fill={colors.white} />
          )}>
          {() => (
            <>
              <Text style={styles.progressText}>{`${progress} Days`}</Text>
              {targetDays && (
                <Text style={styles.targetText}>{`/ ${targetDays} Days`}</Text>
              )}
            </>
          )}
        </AnimatedCircularProgress>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 250,
    marginBottom: 16,
    borderRadius: 10,
  },

  progressText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
  },
  targetText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.text,
  },
  backButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    top: 10,
    left: 10,
    padding: 10,
  },
  backButtonIcon: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
});

export default VisionBoardUserActivityDetails;
