import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Title, Paragraph } from 'react-native-paper';
import colors from '../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  // if (initializing) return null;
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh0LG2D3wccR5muqgi16cvnvX9IigghVE6eQ',
          }}
          style={styles.logo}
        />
        <Title style={styles.title}>Manifest your dream</Title>
        <Paragraph style={styles.tagline}>
          Connecting the world, one search at a time.
        </Paragraph>
        <Paragraph style={styles.manifestation}>
          Login to sync your data
        </Paragraph>
      </View>
      <View style={styles.formContainer}>
        <Button
          mode="contained"
          style={styles.googleLoginButton}
          onPress={() =>
            onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
          }
          icon={() => <AntDesign name="google" size={24} color="black" />}
        >
          Login with Google
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  tagline: {
    marginTop: 8,
    fontStyle: 'italic',
    textAlign: 'center',
    color: colors.text,
  },
  manifestation: {
    marginTop: 16,
    textAlign: 'center',
    color: colors.text,
  },
  formContainer: {
    marginTop: 50,
  },
  googleLoginButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 16,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },

  input: {
    marginBottom: 16,
    backgroundColor: colors.background,
  },

  helpText: {
    alignSelf: 'flex-end',
    marginBottom: 16,
    color: colors.text,
  },
  orText: {
    alignSelf: 'center',
    marginVertical: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
