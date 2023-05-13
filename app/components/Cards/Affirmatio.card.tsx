import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {Card, Title} from 'react-native-paper';
import colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {formateDate} from '../../common/functions';

const Visioncard = ({title, image, date}: any) => {
  console.log(date, 'This is a date time');
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <Icon
          name="bookmark"
          size={20}
          color={colors.primary}
          style={styles.icon}
        />
      </View>
      <View style={styles.contentContainer}>
        <Title style={styles.cardTitle}>{title}</Title>
        <View style={styles.metaContainer}>
          <Icon
            name="calendar-o"
            size={14}
            color={colors.primary}
            style={styles.metaIcon}
          />
          <Text style={styles.metaText}>{formateDate(date)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginVertical: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 0.2,
    borderColor: colors.grayText,
  },
  imageContainer: {
    position: 'relative',
    width: '30%',
  },
  image: {
    height: 120,
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
  contentContainer: {
    padding: 16,
    width: '70%',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.text,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    marginRight: 5,
  },
  metaText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 5,
  },
});

export default Visioncard;
