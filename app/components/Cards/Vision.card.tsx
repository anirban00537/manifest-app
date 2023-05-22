import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../../constants/colors';
import {formateDate} from '../../common/functions';

const VisionCard = ({item}: any) => {
  const navigation: any = useNavigation();
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('AuthenticatedStack', {
          screen: 'VisionDetails',
          params: {_id: item._id},
        });
      }}>
      <Animated.View
        style={[styles.card, {transform: [{translateX: slideAnim}]}]}>
        <LinearGradient
          colors={[colors.background1, colors.background, colors.background1]}
          style={styles.gradientContainer}
          start={{x: 2, y: 0}}
          end={{x: 0.5, y: 3}}>
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
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 5,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginVertical: 8,
    padding: 10,
  },
  imageContainer: {
    width: 90,
    height: 100,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colors.text,
  },
  cardFooterText: {
    fontSize: 10,
    color: colors.primary,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateTitle: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: colors.grayText,
    marginRight: 4,
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: colors.grayText,
  },
});

export default VisionCard;
