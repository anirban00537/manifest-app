import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import {
  Button,
  Card,
  Divider,
  IconButton,
  MD3Colors,
  Menu,
  Title,
} from 'react-native-paper';

const AffirmationCard = ({
  affirmation,
  imageSource,
  onDelete,
  onEdit,
}: any) => {
  const [visible, setVisible] = useState(false);
  const closeMenu = () => {
    setVisible(false);
  };
  const openMenu = () => {
    setVisible(true);
  };
  return (
    <TouchableOpacity style={styles.card}>
      <Card>
        <ImageBackground
          source={{
            uri: imageSource ? imageSource : 'https://picsum.photos/200',
          }}
          style={styles.cardBackground}
        >
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}
          />
          <Title style={[styles.cardTitle, { color: colors.text }]}>
            {affirmation}
          </Title>
        </ImageBackground>
      </Card>
    </TouchableOpacity>
  );
};

{
}
const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginVertical: 8,
    elevation: 3,
    borderRadius: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardBackground: {
    height: 150,
    padding: 6,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 0,
    borderColor: '#000000',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    resizeMode: 'cover',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
  },
  notDoneBadge: {
    paddingHorizontal: 8,
  },
  doneBadge: {
    paddingHorizontal: 8,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
});

export default AffirmationCard;
