import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Badge } from 'react-native-paper';
import colors from '../../constants/colors';

const VisionboardTab = ({ data }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{data?.title}</Text>
    </View>
  );
};

export default VisionboardTab;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: colors.primary,
    margin: 4,
    borderRadius: 4,
    // borderWidth: 1,
    // borderColor: colors.border,
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
});
