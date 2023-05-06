import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {ObjectId} from 'bson';
//@ts-ignore
import {executeSql, getDBConnection} from './db.hook';
import RNFS from 'react-native-fs';
import {RealmContext} from '../models';
import {VisionBoard} from '../models/VisionBoard';

export const useVisionBoardCreate = () => {
  const [visible, setVisible] = useState(false);
  const [affirmations, setAffirmations] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const navigation = useNavigation();
  const {useRealm} = RealmContext;

  const realm = useRealm();
  const createVisionBoard = async (title: string) => {
    try {
      await realm.write(() => {
        realm.create('VisionBoard', {
          _id: new Realm.BSON.ObjectId(),
          title: title,
          createdAt: Date(),
          updatedAt: Date(),
          affirmation: affirmations,
        });
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    createVisionBoard,
    visible,
    setVisible,
    affirmations,
    setAffirmations,
    title,
    setTitle,
  };
};

export const useGetVisionBoard = () => {
  const isFocused = useIsFocused();
  const [visionDetails, setVisionDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {useQuery} = RealmContext;
  const {useRealm} = RealmContext;
  const realm = useRealm();

  const result = useQuery('VisionBoard');
  const getVisionBoardDetails = async (_id: any) => {
    setLoading(true);
    try {
      const visionBoard: any = await realm.objectForPrimaryKey(
        'VisionBoard',
        _id,
      );

      if (visionBoard) {
        setVisionDetails(visionBoard);
        setLoading(false);
      } else {
        setLoading(false);

        throw new Error(`No vision board found with _id: ${_id}`);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      throw error;
    }
  };

  const visionBoards = useMemo(() => result.sorted('createdAt'), [result]);

  return {visionBoards, loading, error, getVisionBoardDetails};
};
export const useGetVisionBoardDetails = () => {
  const [visionDetails, setVisionDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {useRealm} = RealmContext;
  const realm = useRealm();

  const getVisionBoardDetails = async (_id: any) => {
    setLoading(true);

    try {
      const visionBoard: any = await realm.objectForPrimaryKey(
        'VisionBoard',
        _id,
      );

      if (visionBoard) {
        setVisionDetails(visionBoard);
        setLoading(false);
      } else {
        setLoading(false);

        throw new Error(`No vision board found with _id: ${_id}`);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      throw error;
    }
  };

  return {loading, error, getVisionBoardDetails, visionDetails};
};
