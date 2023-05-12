import React from 'react';
import {StyleSheet, ImageBackground, View, Text} from 'react-native';
import {Card, Title} from 'react-native-paper';
import colors from '../../constants/colors';

const Visioncard = ({title, image, date}: any) => {
  return (
    <Card style={styles.card}>
      <ImageBackground
        source={{
          uri: image,
        }}
        style={styles.cardBackground}>
        <View style={[styles.overlay, {backgroundColor: colors.background}]} />
        <View style={styles.titleContainer}>
          <Title style={styles.cardTitle}>{title}</Title>
          {/* <Text style={styles.date}>{date}</Text> */}
        </View>
      </ImageBackground>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginVertical: 8,
    // borderRadius: 13,
    overflow: 'hidden',
  },
  cardBackground: {
    height: 280,
    justifyContent: 'flex-end',
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.text,
    fontFamily: 'Poppins-Regular',
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
