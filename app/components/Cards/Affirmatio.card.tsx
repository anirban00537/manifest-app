import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {Card, Title} from 'react-native-paper';
import colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {formateDate} from '../../common/functions';
import {Menu} from 'react-native-paper'; // Import IconButton from react-native-paper
import IconEntypo from 'react-native-vector-icons/Entypo';

const Visioncard = ({title, image, date}: any) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <Title style={styles.cardTitle}>{title}</Title>
        <View style={styles.metaContainer}>
          <Icon
            name="calendar-o"
            size={14}
            color={colors.grayText}
            style={styles.metaIcon}
          />
          <Text style={styles.metaText}>{formateDate(date)}</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <IconEntypo
              name="dots-three-vertical"
              size={20}
              color={colors.white}
              onPress={openMenu}
            />
          }>
          <Menu.Item onPress={() => {}} title="Delete" />
          <Menu.Item onPress={() => {}} title="Delete" />
        </Menu>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginVertical: 8,
    backgroundColor: colors.background,
    overflow: 'hidden',
    flexDirection: 'row',
    borderWidth: 0.1,
    borderColor: colors.dark1,
  },
  menuContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    position: 'relative',
    width: '15%',
  },
  image: {
    height: 70,
    width: 70,
    resizeMode: 'cover',
  },
  icon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
  contentContainer: {
    width: '85%',
    marginLeft: 30,
    justifyContent: 'flex-start',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.text,
    fontFamily: 'Poppins-Regular',
    // marginBottom: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaIcon: {
    marginRight: 5,
  },
  metaText: {
    fontSize: 12,
    color: colors.grayText,
    marginLeft: 3,
  },
});

export default Visioncard;
