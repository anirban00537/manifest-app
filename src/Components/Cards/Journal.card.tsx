import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';

const JournalCard = ({ data }: any) => {
  return (
    <View style={styles.container}>
      <Card elevation={3} style={styles.card}>
        <Card.Content>
          <View style={styles.contentContainer}>
            <Title style={styles.title}>This is title</Title>
            <Paragraph style={styles.date}>{data.date}</Paragraph>
          </View>
          <Paragraph style={styles.content}>{data.content}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    color: 'gray',
  },
  content: {
    marginTop: 10,
  },
});

export default JournalCard;
