import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import colors from '../../constants/colors';

const VisionProgressCard = ({title, dayProgress}: any) => {
  const targetDays = 21;
  const achievedDays = Math.round((dayProgress / 100) * targetDays);
  const missedDays = targetDays - achievedDays;

  const twentyOneDayProgress = Math.round((dayProgress / targetDays) * 100);
  const ninetyDayProgress = Math.round((dayProgress / 90) * 100);
  const threeSixtyFiveDayProgress = Math.round((dayProgress / 365) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {/* <Text style={styles.description}>{description}</Text> */}
      <ProgressBar progress={dayProgress / 100} color={colors.primary} />
      <View style={styles.progressLabels}>
        <Text
          style={styles.progressLabel}>{`${achievedDays} days completed`}</Text>
        <Text style={styles.progressLabel}>{`${missedDays} days missed`}</Text>
        <Text style={styles.progressLabel}>{`${targetDays} days target`}</Text>
      </View>
      <Text style={styles.progress}>{`${505} times manifested`}</Text>

      <View style={styles.secondaryProgress}>
        <View
          style={[
            styles.secondaryProgressIndicator,
            {width: `${twentyOneDayProgress}%`},
          ]}
        />
        <View
          style={[
            styles.secondaryProgressIndicator,
            {width: `${ninetyDayProgress}%`},
          ]}
        />
        <View
          style={[
            styles.secondaryProgressIndicator,
            {width: `${threeSixtyFiveDayProgress}%`},
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background1,
    borderRadius: 8,
    // padding: 10,
    // marginBottom: 16,
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  progress: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
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
  secondaryProgress: {
    flexDirection: 'row',
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 8,
  },
  secondaryProgressIndicator: {
    height: 8,
  },
});

export default VisionProgressCard;
