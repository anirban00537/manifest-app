import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const Empty = ({
  msg,
  msgSmall,
  width = 150,
  height = 150,
  fontSize = 26,
}: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/canvas.png')}
        style={{width: width, height: height}}
        resizeMode={'cover'}
      />
      <Text
        style={{
          fontSize: fontSize,
          color: colors.white,
        }}>
        {msg || 'Empty'}
      </Text>
      <Text style={styles.textSmall}>
        {msgSmall || 'Press + button to create a new visionboard'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 26,
    color: colors.white,
  },
  textSmall: {
    fontSize: 16,
    color: colors.primary,
  },
});

export default Empty;
