import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import {Card, Paragraph, Title, ProgressBar} from 'react-native-paper';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';

const Visioncard = ({item, title, image}: any) => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate('AuthenticatedStack', {
          screen: 'VisionDetails',
          params: {_id: item._id},
        });
      }}>
      <Card>
        <ImageBackground
          source={{
            uri: image,
          }}
          style={styles.cardBackground}>
          <View
            style={[styles.overlay, {backgroundColor: colors.background}]}
          />
          <Title
            style={[
              styles.cardTitle,
              {color: colors.text, fontFamily: 'Roboto-Bold'},
            ]}>
            {title}
          </Title>
        </ImageBackground>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7,
  },
});

export default Visioncard;
