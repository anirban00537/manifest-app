import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {Card, FAB, Paragraph, Title, useTheme} from 'react-native-paper';
import React, {useEffect} from 'react';
import FA from 'react-native-vector-icons/FontAwesome';
import Visioncard from '../components/Cards/Vision.card';
import colors from '../constants/colors';
import {useGetVisionBoard} from '../hooks/visionboard.hook';

const VisionBoard = ({navigation}: any) => {
  const {error, loading, visionBoards} = useGetVisionBoard();
  console.log(visionBoards, 'visionBoards');
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Good Morning</Text>
          <Text style={styles.secondaryTitle}>Add a new vision card</Text>
        </View>
        <View style={styles.cardsContainer}>
          {visionBoards?.map((item: any, index: any) => (
            <Visioncard
              key={index}
              data={{
                // uri: item.affirmations[0].imageUrl,
                uri: '',
                completedCount: 5,
                targetCount: 20,
              }}
              item={item}
            />
          ))}
        </View>
      </ScrollView>
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
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 24,
  },
  title: {
    fontSize: 40,
    color: colors.text,
    fontWeight: '500',
  },
  secondaryTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.primary,
    marginBottom: 5,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 90,
  },
  boardTabContainer: {
    flexDirection: 'row',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
    color: colors.text,
  },
});

export default VisionBoard;
