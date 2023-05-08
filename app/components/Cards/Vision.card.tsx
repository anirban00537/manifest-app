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

const Visioncard = ({data, item, title, image}: any) => {
  const navigation: any = useNavigation();
  const {targetCount, completedCount} = data;

  // Calculate the progress percentage
  const progress = completedCount / targetCount;

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
          <Title style={[styles.cardTitle, {color: colors.text}]}>
            {title}
          </Title>
          {/* Replace Badge with ProgressBar */}
          <View style={styles.progressContainer}>
            <ProgressBar
              progress={progress}
              color={colors.primary}
              style={styles.progressBar}
            />
            <View style={styles.progressTextContainer}>
              <Paragraph
                style={
                  styles.progressText
                }>{`${completedCount} / ${targetCount}`}</Paragraph>
            </View>
          </View>
        </ImageBackground>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginVertical: 8,
    elevation: 3,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardBackground: {
    height: 150,
    justifyContent: 'flex-end',
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressContainer: {
    alignSelf: 'flex-start',
    width: '100%',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 12,
    color: colors.text,
    marginTop: 4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
});

export default Visioncard;
