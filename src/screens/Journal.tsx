import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { FAB, Card, Title, Paragraph } from 'react-native-paper';
import JournalCard from '../Components/Cards/Journal.card';

const JournalHomeScreen = () => {
  // mock data for the journal entries
  const journalEntries = [
    {
      id: 1,
      title: 'My First Entry',
      content:
        'This is my first journal entry. I am excited to start this journey!',
    },
    {
      id: 2,
      title: 'A Walk in the Park',
      content:
        'I went for a walk in the park today and it was so peaceful. The birds were singing and the sun was shining. It was exactly what I needed.',
    },
    {
      id: 3,
      title: 'A New Recipe',
      content:
        'I tried a new recipe today and it turned out amazing! It was a little bit difficult to make, but it was totally worth it.',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={journalEntries}
        renderItem={JournalCard}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => console.log('Add Journal Entry pressed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
});

export default JournalHomeScreen;
