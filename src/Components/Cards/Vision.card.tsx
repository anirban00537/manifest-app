import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { Card, IconButton, Paragraph, Title, Menu } from 'react-native-paper';

const Visioncard = ({ data }: any) => {
  return (
    <Card style={styles.card}>
      <ImageBackground
        source={{ uri: data?.uri ? data.uri : 'https://picsum.photos/700' }}
        style={styles.cardBackground}
      >
        <View style={styles.overlay} />

        <Title style={styles.cardTitle}>My Visions</Title>
      </ImageBackground>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginVertical: 8,
    elevation: 3,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardBackground: {
    height: 300,
    justifyContent: 'flex-end',
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  cardContent: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  cardActions: {
    position: 'absolute',
    top: 8,
    right: 8,
    margin: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Visioncard;
