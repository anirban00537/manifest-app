import {StyleSheet, View, ScrollView} from 'react-native';
import {Card, FAB, Paragraph, Title, useTheme} from 'react-native-paper';
import React, {useEffect} from 'react';
import FA from 'react-native-vector-icons/FontAwesome';
import Visioncard from '../Components/Cards/Vision.card';
import colors from '../constants/colors';
import {useGetVisionBoard} from '../hooks/visionboard.hook';

const VisionBoard = ({navigation}: any) => {
  const {error, loading, visionBoards} = useGetVisionBoard();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Title style={styles.title}>Visionboard</Title>
          <FA
            name="diamond"
            size={26}
            color="#F5A623"
            onPress={() => {
              navigation.navigate('AuthenticatedStack', {screen: 'Premium'});
            }}
          />
        </View>
        <View style={styles.cardsContainer}>
          {visionBoards?.map((item: any) => (
            <Visioncard
              key={item.id}
              data={{
                uri: 'https://cdn.punchng.com/wp-content/uploads/2021/04/26133326/Leadway-Money-Boss.jpg',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
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
