import firestore from '@react-native-firebase/firestore';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';

export const useVisionBoardCreate = () => {
  const navigation = useNavigation();

  const createVisionBoard = async (title: string, description: string) => {
    try {
      const visionBoardCollection = firestore().collection('visionBoards');

      // Create a new document in the visionBoards collection
      const newVisionBoard = await visionBoardCollection.add({
        title,
        description,
      });

      navigation.goBack();
      console.log(`Created new vision board with ID: ${newVisionBoard.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return {createVisionBoard};
};

export const useGetVisionBoard = () => {
  const [visionBoards, setVisionBoards] = useState<any>([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getVisionBoards = async () => {
    console.log(
      'callingggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
    );
    setLoading(true);
    try {
      const visionBoardCollection = firestore().collection('visionBoards');
      const snapshot = await visionBoardCollection.get();

      const visionBoardsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setVisionBoards(visionBoardsData);
      setLoading(false);
    } catch (e: any) {
      console.error(e);
      setError(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getVisionBoards();
  }, [isFocused]);

  return {visionBoards, loading, error};
};
