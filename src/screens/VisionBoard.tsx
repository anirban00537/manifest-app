import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import React from 'react';
import Visioncard from '../Components/Cards/Vision.card';

const VisionBoard = () => {
  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>My Vision Board</Title>
      <View style={styles.cardsContainer}>
        <Visioncard
          data={{
            uri: 'https://cdn.punchng.com/wp-content/uploads/2021/04/26133326/Leadway-Money-Boss.jpg',
          }}
        />
        <Visioncard
          data={{
            uri: 'https://cdn.corporatefinanceinstitute.com/assets/cash-money.jpg',
          }}
        />
        <Visioncard
          data={{
            uri: 'https://img.etimg.com/photo/91783506/91783506.jpg',
          }}
        />
        <Visioncard
          data={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU10dE4-XEUOU_mkq_pqkTO-doa2ObtORaFA',
          }}
        />
        <Visioncard />
        {/* Add more cards as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 90,
  },
});

export default VisionBoard;
