import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Visioncard = ({item}: any) => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('AuthenticatedStack', {
          screen: 'VisionDetails',
          params: {_id: item._id},
        });
      }}>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                item?.affirmation.length > 0 && item.affirmation[0].url
                  ? item.affirmation[0].url
                  : 'https://picsum.photos/700',
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.cardTitle} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={styles.cardFooterText}>
            Visualised a total of {item.total_practiced} times
          </Text>
        </View>
        <View style={styles.playButtonContainer}>
          <Icon name="play-circle-outline" size={46} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 8,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.background1,
  },
  imageContainer: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
  },
  cardTitle: {
    fontSize: 22,
    marginBottom: 8,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
  },
  cardFooterText: {
    fontSize: 16,
    color: colors.primary,
  },
  playButtonContainer: {
    padding: 16,
  },
});

export default Visioncard;
