import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {FAB} from 'react-native-paper';
import React from 'react';
import Visioncard from '../components/Cards/Vision.card';
import colors from '../constants/colors';
import {useGetVisionBoard} from '../hooks/visionboard.hook';
import {getGreetingMessage} from '../common/functions';
import Empty from '../components/Cards/Empty.card';
import LinearGradient from 'react-native-linear-gradient';

const VisionBoard = ({navigation}: any) => {
  const {visionBoards} = useGetVisionBoard();
  const greeting = getGreetingMessage();

  return (
    <View style={styles.container}>
      {visionBoards.length === 0 && (
        <View style={styles.emptyContainer}>
          <Empty msg={'No Visionboard'} />
        </View>
      )}
      {visionBoards.length > 0 && (
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.secondaryTitle}>{greeting}</Text>
          </View>
          <View style={styles.cardsContainer}>
            {visionBoards?.map((item: any, index: any) => (
              <Visioncard
                key={index}
                data={{
                  completedCount: 5,
                  targetCount: 20,
                }}
                item={item}
                image={
                  item?.affirmation.length > 0 && item.affirmation[0].url
                    ? item.affirmation[0].url
                    : 'https://picsum.photos/700'
                }
                title={item?.title}
              />
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
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    color: colors.text,
    fontFamily: 'Poppins-SemiBold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryTitle: {
    fontSize: 22,
    color: colors.primaryLight,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
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
});

export default VisionBoard;
