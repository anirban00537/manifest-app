import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Title, Menu, Divider } from 'react-native-paper';
import colors from '../../constants/colors';

const AffirmationCard = ({
  affirmation,
  onDelete,
  onEdit,
  navigation,
}: any) => {
  const [visible, setVisible] = useState(false);

  const closeMenu = () => {
    setVisible(false);
  };

  const openMenu = () => {
    setVisible(true);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate('AffermationDetailsAndEdit');
      }}
    >
      <Card>
        <Card.Content style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Title style={[styles.cardTitle, { color: colors.text }]}>
              {affirmation}
            </Title>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity onPress={openMenu}>
                  <Ionicons name="ellipsis-vertical" size={24} color="#888" />
                </TouchableOpacity>
              }
            >
              <Menu.Item onPress={onEdit} title="Edit" />
              <Divider />
              <Menu.Item onPress={onDelete} title="Delete" />
            </Menu>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
  cardContent: {
    backgroundColor: colors.background,
  },
});

export default AffirmationCard;
