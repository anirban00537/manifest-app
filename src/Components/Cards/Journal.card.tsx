import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import colors from '../../constants/colors';

const JournalCard = ({ data }: any) => {
  return (
    <View style={styles.container}>
      <Card elevation={3} style={styles.card}>
        <Card.Content>
          <View style={styles.contentContainer}>
            <Title style={styles.title}>{data.item.title}</Title>
            <Paragraph style={styles.date}>{data.item.date}</Paragraph>
          </View>
          <Paragraph style={styles.content}>{data.item.content}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    // backgroundColor: colors.background,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.background1,
    color: colors.text,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    color: colors.text,
  },
  date: {
    // color: 'gray',
    color: colors.text,
  },
  content: {
    marginTop: 10,
    color: colors.text,
  },
});

export default JournalCard;
