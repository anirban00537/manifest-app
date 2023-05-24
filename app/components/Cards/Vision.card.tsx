import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {formateDate} from '../../common/functions';

const Visioncard = ({item}: any) => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      style={styles.constinar}
      onPress={() => {
        navigation.navigate('AuthenticatedStack', {
          screen: 'VisionDetails',
          params: {_id: item._id},
        });
      }}>
      <View style={styles.card}>
        <ImageBackground
          source={{
            uri:
              item?.affirmation.length > 0 && item.affirmation[0].url
                ? item.affirmation[0].url
                : 'https://picsum.photos/700',
          }}
          style={styles.cardBackground}>
          <View style={styles.gradient} />
          <View style={styles.detailsContainer}>
            <Text
              style={styles.cardTitle}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.title}
            </Text>
            <View style={styles.dateContainer}>
              <Text style={styles.dateTitle}>End Date:</Text>
              <Text style={styles.dateText}>{formateDate(item?.endDate)}</Text>
            </View>
            <Text style={styles.cardFooterText}>
              {item.affirmation.length} Affirmations
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  constinar: {
    width: '100%',
    padding: 5,
  },
  card: {
    width: '100%',
    marginVertical: 8,
    borderRadius: 7,
    overflow: 'hidden',
  },
  cardBackground: {
    height: 150,
    justifyContent: 'flex-end',
    padding: 16,
    borderRadius: 7,
    overflow: 'hidden',
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: colors.grayText,
  },
  cardTitle: {
    fontSize: 22,
    marginBottom: 8,
    paddingTop: 5,
  },
  dateTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: colors.grayText,
    marginRight: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // semi-transparent black
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardFooterText: {
    fontSize: 16,
    // marginLeft: 8,
    color: colors.primary,
  },
});

export default Visioncard;
