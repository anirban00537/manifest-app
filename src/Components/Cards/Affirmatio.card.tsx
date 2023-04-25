import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Title, Menu, Divider, Paragraph } from 'react-native-paper';
import colors from '../../constants/colors';

const AffirmationCard = ({
  affirmation,
  onDelete,
  onEdit,
  navigation,
  date,
}: any) => {
  const [visible, setVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('AffermationDetailsAndEdit');
      }}
    >
      <View style={styles.container}>
        <Card elevation={3} style={styles.card}>
          <Card.Content>
            <View style={styles.contentContainer}>
              <Title style={styles.title}>{affirmation}</Title>
              {/* Content here */}
            </View>
            {/* Date here */}
            <Paragraph style={styles.date}>{date}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 12,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.background1,
    color: colors.text,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'left',
    fontSize: 15,
  },
  date: {
    marginTop: 10,
    color: colors.primary,
  },
});

export default AffirmationCard;
