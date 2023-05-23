import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import VisionCard from '../components/Cards/Vision.card';
import colors from '../constants/colors';
import {useGetVisionBoard} from '../hooks/visionboard.hook';
import {getGreetingMessage} from '../common/functions';
import Empty from '../components/Cards/Empty.card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const VisionBoard = ({navigation}: any) => {
  const {visionBoards} = useGetVisionBoard();
  const greeting = getGreetingMessage();

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate('AuthenticatedStack', {
              screen: 'CreateVisionCard',
            });
          }}>
          <Icon name="plus" size={35} color="white" />
        </TouchableOpacity>
      </View>
      {visionBoards.length === 0 && (
        <View style={styles.emptyContainer}>
          <Empty msg={'No Visionboard'} />
        </View>
      )}
      {visionBoards.length > 0 && (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <View style={styles.cardsContainer}>
            {visionBoards?.map((item: any, index: any) => (
              <VisionCard key={index} item={item} />
            ))}
          </View>
        </ScrollView>
      )}
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
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 30,
    color: colors.text,
    fontFamily: 'Poppins-SemiBold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 100,
  },
  addButton: {
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSection: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 6,
    marginBottom: 25,
  },
});

export default VisionBoard;
