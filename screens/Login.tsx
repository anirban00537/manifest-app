import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

import colors from '../constants/colors';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const LoginPage = () => {
  async function handleGoogleButtonPress() {
    try {
      // get the user id token
      const {idToken} = await GoogleSignin.signIn();
      // create a credential using the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // authenticate the user using the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('error', error);
    }
  }
  return (
    <View style={styles.container}>
      <Icon name="google" size={60} color="#DB4437" />
      <Text style={styles.title}>Sign in with Google</Text>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleGoogleButtonPress}>
        <Icon name="google" size={20} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};
export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 30,
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DB4437',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
