import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Circle} from 'react-native-svg';
import FA from 'react-native-vector-icons/FontAwesome5';

const VisionBoardUserActivityDetails = ({
  days,
  targetDays,
  navigation,
}: any) => {
  const progress = 50; // This is just an example value for demonstration purposes

  return (
    <LinearGradient
      colors={[colors.dark1, colors.primary]}
      start={{x: 0, y: 0}}
      end={{x: 2, y: 1}}
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
          size={165}
          width={10}
          fill={days?.completedPercentage}
          tintColor={colors.green}
          backgroundColor={colors.dark1}
          backgroundWidth={20}
          lineCap="round"
          duration={1500}
          renderCap={({center}) => (
            <Circle cx={center.x} cy={center.y} r="10" fill={colors.white} />
          )}>
          {() => (
            <>
              <>
                <Text
                  style={
                    styles.progressText
                  }>{`${days?.daysPassed} Days`}</Text>
                <Text
                  style={
                    styles.targetText
                  }>{`/ ${days?.daysBetween} Days`}</Text>
              </>
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
    height: 200,
    marginBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  progressText: {
    fontSize: 16,
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
