import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import {
  Badge,
  Card,
  IconButton,
  Paragraph,
  Title,
  Menu,
} from 'react-native-paper';

const Visioncard = ({ data }: any) => {
  const [isDone, setIsDone] = useState(false);

  return (
    <Card style={styles.card}>
      <ImageBackground
        source={{ uri: data?.uri ? data.uri : 'https://picsum.photos/700' }}
        style={styles.cardBackground}
      >
        <View style={styles.overlay} />

        <Title style={styles.cardTitle}>My Visions</Title>
        <View style={styles.badgeContainer}>
          <Badge style={isDone ? styles.doneBadge : styles.notDoneBadge}>
            {isDone ? 'Done' : 'Not Done'}
          </Badge>
        </View>
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
  badgeContainer: {
    alignSelf: 'flex-start',
  },
  notDoneBadge: {
    backgroundColor: '#f44336',
    paddingHorizontal: 8,
  },
  doneBadge: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Visioncard;
