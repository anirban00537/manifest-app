import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const PremiumScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Manifestation Mastery</Text>
        <Text style={styles.subheading}>Unlock Your Full Potential</Text>
        <View style={styles.buttonContainer}>
          <Text>Get Premium</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    backgroundColor: '#55CB95',
    borderRadius: 24,
    padding: 16,
  },
});

export default PremiumScreen;
