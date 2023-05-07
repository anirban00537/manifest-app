import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
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
      }}>
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
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={onEdit}>
            <Icon
              name="edit"
              size={20}
              color={colors.white}
              style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Icon
              name="trash"
              size={20}
              color={colors.white}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 1,
    height: 100,
    backgroundColor: colors.background,
    justifyContent: 'flex-start',
  },
  image: {
    height: 100,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 2,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'left',
    fontSize: 15,
    marginBottom: 8,
    fontFamily: 'Montserrat-SemiBold',
  },
  date: {
    color: colors.primary,
    textAlign: 'left',
    fontFamily: 'OpenSans-Regular',
  },
  iconContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default AffirmationCard;
