import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../constants/colors';

const AffirmationCard = ({ affirmation }: any) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Ionicons name="heart" size={24} color={colors.primary} />
          <Ionicons
            name="share-social-outline"
            size={24}
            color={colors.primary}
          />
        </View>
        <Text style={styles.affirmation}>{affirmation}</Text>
        <View style={styles.footer}>
          <Text style={styles.author}>- Unknown</Text>
          <Ionicons name="bookmark-outline" size={24} color={colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background2,
    borderRadius: 16,
    padding: 24,
    // marginHorizontal: 24,
    marginBottom: 16,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  affirmation: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
});

export default AffirmationCard;
