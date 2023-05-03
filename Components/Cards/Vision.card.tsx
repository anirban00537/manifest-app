import React, {useState} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  IconButton,
  Paragraph,
  Title,
  Menu,
  useTheme,
  ProgressBar, // import the ProgressBar component
} from 'react-native-paper';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';

const Visioncard = ({data, item}: any) => {
  const [isDone, setIsDone] = useState(false);
  const navigation: any = useNavigation();
  console.log(item?.title, 'item');
  const {targetCount, completedCount} = data;

  // Calculate the progress percentage
  const progress = completedCount / targetCount;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate('AuthenticatedStack', {screen: 'VisionDetails'});
      }}>
      <Card>
        <ImageBackground
          source={{uri: data?.uri ? data.uri : 'https://picsum.photos/700'}}
          style={styles.cardBackground}>
          <View
            style={[styles.overlay, {backgroundColor: colors.background}]}
          />
          <Title style={[styles.cardTitle, {color: colors.text}]}>
            {item?.title}
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
    width: '48%',
    marginVertical: 8,
    elevation: 3,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardBackground: {
    height: 300,
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
