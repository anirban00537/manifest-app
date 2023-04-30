import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';

const AffirmationCard = ({
  affirmation,
  onDelete,
  onEdit,
  navigation,
  imageSource,
  date,
}: any) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('AffermationDetailsAndEdit');
      }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: imageSource ? imageSource : 'https://picsum.photos/200',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{affirmation}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 12,
    backgroundColor: colors.background1,
    // borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    height: 150,
    justifyContent: 'flex-end',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 2,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  title: {
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'left',
    fontSize: 15,
    marginBottom: 8,
  },
  date: {
    color: colors.primary,
    textAlign: 'left',
    marginBottom: 8,
  },
});

export default AffirmationCard;
