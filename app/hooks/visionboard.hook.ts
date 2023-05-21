import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useMemo, useState} from 'react';
//@ts-ignore
import {RealmContext} from '../models';

export const useVisionBoardCreate = () => {
  const [visible, setVisible] = useState(false);
  const [endDate, setendDate] = useState(false);
  const [daily_target, setDaily_target] = useState(2);
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
          total_practiced: 0,
          daily_target: daily_target,
          endDate: endDate,
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
  const editAffirmationByVisionBoardId = async (
    visionBoardId: string,
    affirmationId: string,
    url: string,
    title: string,
  ) => {
    try {
      await realm.write(() => {
        const visionBoard: any = realm.objectForPrimaryKey(
          'VisionBoard',
          visionBoardId,
        );
        if (!visionBoard)
          throw new Error(`VisionBoard with id ${visionBoardId} not found`);
        const affirmation = visionBoard.affirmation.find(
          (a: any) => a._id.toHexString() === affirmationId,
        );
        if (!affirmation)
          throw new Error(`Affirmation with id ${affirmationId} not found`);
        affirmation.url = url;
        affirmation.title = title;
        visionBoard.updatedAt = new Date();
      });
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
    setDaily_target,
    daily_target,
    setTitle,
    endDate,
    setendDate,
  };
};

export const useGetVisionBoard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {useQuery} = RealmContext;
  const {useRealm} = RealmContext;
  const realm = useRealm();

  const result = useQuery('VisionBoard');

  const visionBoards = useMemo(
    () => result.sorted('createdAt', true),
    [result],
  );

  return {
    visionBoards,
    loading,
    error,
  };
};
export const useGetVisionBoardDetails = () => {
  const [visionDetails, setVisionDetails] = useState<any>({
    title: '',
    endDate: '',
    createdAt: '',
    daily_target: 0,
    updatedAt: '',
    affirmation: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const {useRealm} = RealmContext;
  const realm = useRealm();

  function getCompletedPercentage(dailyTarget: any, totalPracticed: any) {
    const completedPercentage = (totalPracticed / dailyTarget) * 100;
    if (Math.round(completedPercentage) > 100) {
      return 100;
    } else {
      return Math.round(completedPercentage);
    }
  }
  const getVisionBoardDetails = async (_id: any) => {
    setLoading(true);

    try {
      const visionBoard: any = await realm.objectForPrimaryKey(
        'VisionBoard',
        _id,
      );

      if (!visionBoard) {
        throw new Error(`Could not find VisionBoard with id ${_id}`);
      }

      const currentDate = new Date();
      const date = currentDate.toLocaleDateString();

      const PracticeData = visionBoard.PracticeTimeLog.find(
        (log: any) => log.logDate === date,
      );

      setPercentage(
        getCompletedPercentage(
          parseInt(visionBoard?.daily_target ? visionBoard?.daily_target : 0),
          parseInt(
            PracticeData?.total_practiced ? PracticeData?.total_practiced : 0,
          ),
        ),
      );

      if (visionBoard) {
        setVisionDetails(visionBoard);
      } else {
        setVisionDetails(null); // or setVisionDetails({})
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      throw error;
    }
  };

  const deleteVisionBoard = async (visionBoardId: string, navigation: any) => {
    try {
      await setLoading(true);

      await realm.write(() => {
        const visionBoard: any = realm.objectForPrimaryKey(
          'VisionBoard',
          visionBoardId,
        );
        if (!visionBoard)
          throw new Error(`VisionBoard with id ${visionBoardId} not found`);
        realm.delete(visionBoard.affirmation);
        realm.delete(visionBoard);
      });
      navigation.goBack(); // Navigate back after successful deletion
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const addAffirmationToVisionBoard = async (
    visionBoardId: string,
    affirmation: {_id: any; url: string; title: string},
  ) => {
    try {
      const visionBoard: any = realm.objectForPrimaryKey(
        'VisionBoard',
        visionBoardId,
      );

      if (!visionBoard) {
        throw new Error(`Could not find VisionBoard with id ${visionBoardId}`);
      }

      await realm.write(() => {
        visionBoard.affirmation.push(affirmation);
        visionBoard.updatedAt = new Date();
      });
      getVisionBoardDetails(visionBoardId);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePractice = async (visionBoardId: string) => {
    try {
      const visionBoard: any = realm.objectForPrimaryKey(
        'VisionBoard',
        visionBoardId,
      );

      if (!visionBoard) {
        throw new Error(`Could not find VisionBoard with id ${visionBoardId}`);
      }

      const currentDate = new Date();
      const date = currentDate.toLocaleDateString();

      const existingLogIndex = visionBoard.PracticeTimeLog.findIndex(
        (log: any) => log.logDate === date,
      );

      if (existingLogIndex !== -1) {
        // Increment the total_practiced field by 1
        await realm.write(() => {
          visionBoard.PracticeTimeLog[existingLogIndex].total_practiced += 1;
        });
      } else {
        // Create a new PracticeTimeLog entry for today's date
        await realm.write(() => {
          const practiceTimeLog = {
            _id: new Realm.BSON.ObjectId(),
            logDate: date,
            total_practiced: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          visionBoard.PracticeTimeLog.push(practiceTimeLog);
        });
      }

      // Update the updatedAt field of the VisionBoard
      await realm.write(() => {
        visionBoard.updatedAt = new Date();
      });

      getVisionBoardDetails(visionBoardId);
    } catch (error) {
      console.error(error, 'error');
    }
  };

  return {
    loading,
    error,
    getVisionBoardDetails,
    visionDetails,
    percentage,
    addAffirmationToVisionBoard,
    deleteVisionBoard,
    updatePractice,
  };
};
