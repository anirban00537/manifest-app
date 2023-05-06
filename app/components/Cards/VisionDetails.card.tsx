import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/colors';

const VisionBoardUserActivityDetails = ({title, totalAffirmations}: any) => {
  return (
    <LinearGradient
      colors={[colors.primaryDark, colors.primary]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>Total Affirmations:</Text>
        <Text style={styles.value}>{totalAffirmations}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
});

export default VisionBoardUserActivityDetails;
