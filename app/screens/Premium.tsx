import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Button, TouchableRipple} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import FA from 'react-native-vector-icons/FontAwesome5';
import colors from '../constants/colors';

const PremiumScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <FA
        name="arrow-left"
        size={24}
        color={colors.text}
        onPress={() => navigation.canGoBack()}
        style={styles.backButton}
      />
      <Image
        source={require('../assets/premium.jpg')}
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Manifestation Mastery</Text>
        <Text style={styles.subheading}>Unlock Your Full Potential</Text>
        <TouchableRipple
          style={styles.buttonContainer}
          onPress={() => navigation.canGoBack()}>
          <Text style={styles.buttonContainerText}>Get Premium</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.5,
  },

  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  backButton: {
    position: 'absolute',
    top: 18,
    left: 18,
    color: colors.text,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 16,
  },
  buttonContainerText: {
    color: colors.text,
  },
});

export default PremiumScreen;
