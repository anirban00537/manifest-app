import Realm from 'realm';
import {useEffect, useState} from 'react';
import { VisionCard} from '../db/realm';
import {useNavigation, useIsFocused} from '@react-navigation/native';

export const useVisionBoardCreate = () => {
  const navigation = useNavigation();
  const createVisionBoard = async (title: string, description: string) => {
    const realm = await Realm.open({schema: [VisionCard.schema]});

    realm.write(() => {
      realm.create('VisionBoard', {
        id: new Date().toISOString(),
        title: title,
        description: description,
      });
    });

    console.log('Created new vision board in Realm');
  };

  return {createVisionBoard};
};

export const useGetVisionBoard = () => {
  const [visionBoards, setVisionBoards] = useState<any>([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getVisionBoards = async () => {
    console.log('calling getVisionBoards');

    try {
      const realm = await Realm.open({schema: [VisionCard.schema]});
      const visionBoardsData = realm.objects('VisionBoard');
      setVisionBoards(visionBoardsData);
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getVisionBoards();
  }, [isFocused]);

  return {visionBoards, loading, error};
};
