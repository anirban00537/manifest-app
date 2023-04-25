import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, FAB, Paragraph, Title, useTheme } from 'react-native-paper';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Visioncard from '../Components/Cards/Vision.card';
import VisionboardTab from '../Components/Tabs/Visionboard.tab';
import colors from '../constants/colors';
import { StatusBar } from 'expo-status-bar';

const VisionBoard = ({ navigation }: any) => {
  const { colors, dark } = useTheme(); // retrieve the theme colors

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Title style={styles.title}>Visionboard</Title>
          <MaterialCommunityIcons
            name="crown"
            size={32}
            color="#F5A623"
            onPress={() => {
              navigation.navigate('OtherStacks', { screen: 'Premium' });
            }}
          />
        </View>
        {/* <View style={styles.boardTabContainer}>
          <VisionboardTab data={{ title: 'All' }} />
          <VisionboardTab data={{ title: 'Done' }} />
          <VisionboardTab data={{ title: 'Not Achived' }} />
        </View> */}
        <View style={styles.cardsContainer}>
          <Visioncard
            data={{
              uri: 'https://cdn.punchng.com/wp-content/uploads/2021/04/26133326/Leadway-Money-Boss.jpg',
              completedCount: 5,
              targetCount: 20,
            }}
          />
          <Visioncard
            data={{
              uri: 'https://cdn.corporatefinanceinstitute.com/assets/cash-money.jpg',
              completedCount: 5,
              targetCount: 20,
            }}
            navigation={navigation}
          />
          <Visioncard
            data={{
              uri: 'https://img.etimg.com/photo/91783506/91783506.jpg',
              completedCount: 5,
              targetCount: 20,
            }}
            navigation={navigation}
          />
          <Visioncard
            data={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU10dE4-XEUOU_mkq_pqkTO-doa2ObtORaFA',
              completedCount: 5,
              targetCount: 20,
            }}
            navigation={navigation}
          />
          <Visioncard
            data={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU10dE4-XEUOU_mkq_pqkTO-doa2ObtORaFA',
              completedCount: 5,
              targetCount: 20,
            }}
            navigation={navigation}
          />
          {/* Add more cards as needed */}
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        color="white"
        onPress={() => {
          navigation.navigate('OtherStacks', { screen: 'CreateVisionCard' });
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
    // marginHorizontal: 15,
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
