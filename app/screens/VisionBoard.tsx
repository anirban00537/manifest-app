import {StyleSheet, View, ScrollView, Text, Animated} from 'react-native';
import {FAB} from 'react-native-paper';
import React, {useEffect, useRef} from 'react';
import VisionCard from '../components/Cards/Vision.card';
import colors from '../constants/colors';
import {useGetVisionBoard} from '../hooks/visionboard.hook';
import {getGreetingMessage} from '../common/functions';
import Empty from '../components/Cards/Empty.card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const VisionBoard = ({navigation}: any) => {
  const {visionBoards} = useGetVisionBoard();
  const greeting = getGreetingMessage();
  const floatValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const translateY = floatValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          {/* <Text style={styles.secondaryTitle}>{greeting}</Text> */}
        </View>
        <Animated.View
          style={[styles.premiumIconContainer, {transform: [{translateY}]}]}>
          <Icon name="diamond" size={30} color={colors.white} />
        </Animated.View>
      </View>
      {visionBoards.length === 0 && (
        <View style={styles.emptyContainer}>
          <Empty msg={'No Visionboard'} />
        </View>
      )}
      {visionBoards.length > 0 && (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.cardsContainer}>
            {visionBoards?.map((item: any, index: any) => (
              <VisionCard key={index} item={item} />
            ))}
          </View>
        </ScrollView>
      )}
      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={() => {
          navigation.navigate('AuthenticatedStack', {
            screen: 'CreateVisionCard',
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 30,
    color: colors.text,
    fontFamily: 'Poppins-SemiBold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryTitle: {
    fontSize: 18,
    color: colors.primaryLight,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 100,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
  premiumIconContainer: {
    marginTop: 10,
  },
  headerSection: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 6,
    marginBottom: 25,
  },
});

export default VisionBoard;
