import React from 'react';
import {StyleSheet, ImageBackground, View, Text} from 'react-native';
import {Card, Title} from 'react-native-paper';
import colors from '../../constants/colors';

const Visioncard = ({title, image, date}: any) => {
  console.log(date, 'datedatedatedatedatedatedatedatedatedate');
  return (
    <View style={styles.card}>
      <Card>
        <ImageBackground
          source={{
            uri: image,
          }}
          style={styles.cardBackground}>
          <View
            style={[styles.overlay, {backgroundColor: colors.background}]}
          />
        </ImageBackground>
      </Card>
      <View style={styles.infoContainer}>
        <Title style={[styles.cardTitle, {color: colors.text}]}>{title}</Title>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginVertical: 8,
    backgroundColor: colors.background1,
    elevation: 10,
    borderRadius: 13,
    overflow: 'hidden',
  },
  cardBackground: {
    height: 200,
    justifyContent: 'flex-end',
    padding: 16,
  },
  infoContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '400',
  },
  date: {
    fontSize: 10,
    color: colors.primaryDark,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
});

export default Visioncard;
