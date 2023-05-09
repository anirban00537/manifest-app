import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  Paragraph,
  Title,
  ProgressBar, // import the ProgressBar component
} from 'react-native-paper';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';

const Visioncard = ({title, image, date}: any) => {
  const navigation: any = useNavigation();

  // Calculate the progress percentage

  return (
    <View
      style={styles.card}
      // onPress={() => {
      //   navigation.navigate('AuthenticatedStack', {
      //     screen: 'VisionDetails',
      //     params: {_id: item._id},
      //   });
      // }}
    >
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
      <Title style={[styles.cardTitle, {color: colors.text}]}>{title}</Title>
      <View>{date}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginVertical: 8,
    backgroundColor:colors.background1,
    elevation: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardBackground: {
    height: 250,
    justifyContent: 'flex-end',
    padding: 16,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 8,
    paddingHorizontal: 5,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
});

export default Visioncard;
