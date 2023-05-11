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
import LinearGradient from 'react-native-linear-gradient';

const Visioncard = ({item, title, image, animatedValue}: any) => {
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
            uri: image,
          }}
          style={styles.cardBackground}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,2.7)']}
            style={styles.gradient}
          />
          <Title
            style={[
              styles.cardTitle,
              {color: colors.text, fontFamily: 'Poppins-SemiBold'},
            ]}>
            {title}
          </Title>
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
  },
});

export default Visioncard;
