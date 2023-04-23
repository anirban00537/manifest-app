import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const VisionProgressCard = ({ title, description, dayProgress }: any) => {
  const twentyOneDayProgress = Math.round((dayProgress / 21) * 100);
  const ninetyDayProgress = Math.round((dayProgress / 90) * 100);
  const threeSixtyFiveDayProgress = Math.round((dayProgress / 365) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.progress}>{`${dayProgress}%`}</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.progressBar}>
        <View
          style={[styles.progressIndicator, { width: `${dayProgress}%` }]}
        />
        <View
          style={[
            styles.progressIndicator21,
            { width: `${twentyOneDayProgress}%` },
          ]}
        />
        <View
          style={[
            styles.progressIndicator90,
            { width: `${ninetyDayProgress}%` },
          ]}
        />
        <View
          style={[
            styles.progressIndicator365,
            { width: `${threeSixtyFiveDayProgress}%` },
          ]}
        />
      </View>
      <View style={styles.progressLabels}>
        <Text style={styles.progressLabel}>
          21-day: {twentyOneDayProgress}%
        </Text>
        <Text style={styles.progressLabel}>90-day: {ninetyDayProgress}%</Text>
        <Text style={styles.progressLabel}>
          365-day: {threeSixtyFiveDayProgress}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background1,
    borderRadius: 8,
    padding: 16,
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
  progress: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  progressIndicator: {
    height: 8,
    backgroundColor: colors.primary,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  progressIndicator21: {
    height: 8,
    backgroundColor: colors.yellow,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  progressIndicator90: {
    height: 8,
    backgroundColor: colors.green,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  progressIndicator365: {
    height: 8,
    backgroundColor: colors.blue,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: colors.text,
  },
});

export default VisionProgressCard;
