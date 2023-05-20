import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

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
      <Card style={styles.card}>
        <ImageBackground
          source={{
            uri:
              item?.affirmation.length > 0 && item.affirmation[0].url
                ? item.affirmation[0].url
                : 'https://picsum.photos/700',
          }}
          style={styles.cardBackground}>
          <View style={styles.gradient} />
          <View style={styles.cardContent}>
            <Title
              style={[
                styles.cardTitle,
                {color: colors.text, fontFamily: 'Poppins-SemiBold'},
              ]}>
              {item.title}
            </Title>
            <View style={styles.cardFooter}>
              <Title style={styles.cardFooterText}>
                Visualised a total of {item.total_practiced} times
              </Title>
              <Icon
                name="play-circle-outline"
                size={46}
                color={colors.primary}
              />
            </View>
          </View>
        </ImageBackground>
      </Card>
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
  cardTitle: {
    fontSize: 22,
    marginBottom: 8,
    paddingTop: 5,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // semi-transparent black
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
