import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {Card, FAB, Paragraph, Title, useTheme} from 'react-native-paper';
import React, {useEffect} from 'react';
import FA from 'react-native-vector-icons/FontAwesome';
import Visioncard from '../components/Cards/Vision.card';
import colors from '../constants/colors';
import {useGetVisionBoard} from '../hooks/visionboard.hook';
import {getGreetingMessage} from '../common/functions';
import Empty from '../components/Cards/Empty.card';

const VisionBoard = ({navigation}: any) => {
  const {error, loading, visionBoards} = useGetVisionBoard();
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
            <Text style={styles.title}>{greeting}</Text>
            <Text style={styles.secondaryTitle}>Welcome Back</Text>
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
  header: {
    marginTop: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 29,
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
    // marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
  },
});

export default VisionBoard;
