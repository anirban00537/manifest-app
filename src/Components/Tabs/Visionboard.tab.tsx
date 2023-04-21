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
    paddingHorizontal: 7,
    paddingVertical: 2,
    backgroundColor: colors.background2,
    margin: 2,
    borderRadius: 4,
  },
  text: {
    color: 'white',
  },
});
