import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useCallback, useEffect, useMemo, useState} from 'react';
//@ts-ignore
import {executeSql, getDBConnection} from './db.hook';
import RNFS from 'react-native-fs';
import {RealmContext} from '../models';
import {VisionBoard} from '../models/VisionBoard';

const saveImageToDevice = async (imageSource: string) => {
  try {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 10000);
    const fileName = `image_${timestamp}_${randomNumber}.jpg`;
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    const res = await RNFS.downloadFile({
      fromUrl: imageSource,
      toFile: downloadDest,
    });
    console.log(`Image saved to device: ${res}`);
    return downloadDest;
  } catch (error) {
    console.error(error);
  }
};

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
          images: [
            {
              url: 'https://example.com/beach.jpg',
              title: 'Beach',
              caption: 'Relaxing at the beach',
            },
            {
              url: 'https://example.com/mountain.jpg',
              title: 'Mountain',
              caption: 'Conquering the mountain',
            },
          ],
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
  // const [visionBoards, setVisionBoards] = useState<any>([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {useQuery} = RealmContext;

  const result = useQuery('VisionBoard');

  const visionBoards = useMemo(() => result.sorted('createdAt'), [result]);

  return {visionBoards, loading, error};
};
