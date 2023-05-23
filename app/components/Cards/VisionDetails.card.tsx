import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  ToastAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Circle} from 'react-native-svg';
import FA from 'react-native-vector-icons/FontAwesome5';
import {Menu} from 'react-native-paper'; // Import IconButton from react-native-paper
import colors from '../../constants/colors';
import {formateDate} from '../../common/functions';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';

const {width} = Dimensions.get('window');

const VisionBoardUserActivityDetails = ({
  percentage,
  navigation,
  visionDetails,
  updatePractice,
  deleteVisionBoard,
  _id,
}: any) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <TouchableWithoutFeedback>
      <ImageBackground
        source={require('../../assets/premium.jpg')}
        style={styles.backgroundImage}>
        <LinearGradient
          colors={[colors.background1, colors.background2, colors.background]}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
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

          <View style={styles.menuContainer}>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <IconEntypo
                  name="dots-three-vertical"
                  size={20}
                  color={colors.white}
                  onPress={openMenu}
                />
              }>
              <Menu.Item
                onPress={() => {
                  deleteVisionBoard(_id, navigation);
                }}
                title="Delete"
              />
            </Menu>
          </View>

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

          {/* <Text style={styles.practiceText}>
            Keep practicing to maintain your progress and achieve even greater
            results.
          </Text> */}
          <View style={styles.header}>
            <Text style={styles.title}>{visionDetails?.title}</Text>
          </View>
          <Text style={styles.targetDaysText}>
            End Date: {formateDate(visionDetails?.endDate)}
          </Text>
          <TouchableOpacity
            style={styles.playButton}
            onPress={async () => {
              if (visionDetails?.affirmation?.length < 3) {
                ToastAndroid.show(
                  'Require minimum 3 affirmations to play',
                  ToastAndroid.LONG,
                );
                return;
              }
              updatePractice(_id);
              navigation.navigate('AuthenticatedStack', {
                screen: 'Player',
                params: {_id: _id},
              });
            }}>
            <Icon name="play" size={20} color={colors.white} />
            <Text style={styles.playButtonText}>Start Movie</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ImageBackground>
    </TouchableWithoutFeedback>
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
  playButtonText: {
    color: colors.white,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 15,
    // marginTop: 5,
    padding: 10,
    // marginHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
  },
  playButton: {
    backgroundColor: colors.primaryDark,
    width: '50%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 25,
    flexDirection: 'row',
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
  deleteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  menuContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'transparent',
  },
  dropdown: {
    position: 'absolute',
    top: 30,
    right: -10,
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 5,
    elevation: 2,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  dropdownText: {
    color: colors.blue,
    fontSize: 16,
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
