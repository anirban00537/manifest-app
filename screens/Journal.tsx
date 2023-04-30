import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {FAB, Card, Title, Paragraph} from 'react-native-paper';
import JournalCard from '../Components/Cards/Journal.card';
import colors from '../constants/colors';

const JournalHomeScreen = ({navigation}: any) => {
  // mock data for the journal entries
  const journalEntries = [
    {
      id: 1,
      title: 'My First Entry',
      content:
        'This is my first journal entry. I am excited to start this journey!',
      date: 'Thursday 2:22pm',
    },
    {
      id: 2,
      title: 'A Walk in the Park',
      content:
        'I went for a walk in the park today and it was so peaceful. The birds were singing and the sun was shining. It was exactly what I needed.',
      date: 'Thursday 2:22pm',
    },
    {
      id: 3,
      title: 'A New Recipe',
      content:
        'I tried a new recipe today and it turned out amazing! It was a little bit difficult to make, but it was totally worth it.',
      date: 'Thursday 2:22pm',
    },
    {
      id: 4,
      title: 'A New Recipe',
      content:
        'I tried a new recipe today and it turned out amazing! It was a little bit difficult to make, but it was totally worth it.',
      date: 'Thursday 2:22pm',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={journalEntries}
        renderItem={data => <JournalCard data={data} />}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          navigation.navigate('PremiumStack');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 22,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    marginVertical: 8,
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

export default JournalHomeScreen;
