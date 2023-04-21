import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import {
  Badge,
  Card,
  IconButton,
  Paragraph,
  Title,
  Menu,
  useTheme, // import the useTheme hook
} from 'react-native-paper';
import colors from '../../constants/colors';

const Visioncard = ({ data }: any) => {
  const [isDone, setIsDone] = useState(false);

  return (
    <Card style={styles.card}>
      <ImageBackground
        source={{ uri: data?.uri ? data.uri : 'https://picsum.photos/700' }}
        style={styles.cardBackground}
      >
        <View
          style={[styles.overlay, { backgroundColor: colors.background }]}
        />
        {/* @ts-ignore */}
        <Title style={[styles.cardTitle, { color: colors.text }]}>
          My Visions
        </Title>
        <View style={styles.badgeContainer}>
          <Badge
            style={[
              isDone ? styles.doneBadge : styles.notDoneBadge,
              { backgroundColor: colors.primary },
            ]}
          >
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
  },
  badgeContainer: {
    alignSelf: 'flex-start',
  },
  notDoneBadge: {
    paddingHorizontal: 8,
  },
  doneBadge: {
    paddingHorizontal: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
});

export default Visioncard;
