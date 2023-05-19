import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useMemo, useState} from 'react';
//@ts-ignore
import {RealmContext} from '../models';

export const useVisionBoardCreate = () => {
  const [visible, setVisible] = useState(false);
  const [endDate, setendDate] = useState(false);
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
    setTitle,
    endDate,
    setendDate,
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

  return {
    visionBoards,
    loading,
    error,
    getVisionBoardDetails,
  };
};
export const useGetVisionBoardDetails = () => {
  const [visionDetails, setVisionDetails] = useState<any>({
    title: '',
    total_practiced: '',
    endDate: '',
    createdAt: '',
    updatedAt: '',
    affirmation: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {useRealm} = RealmContext;
  const realm = useRealm();
  const getDaysBetweenDates = (startDate: any, endDate: any) => {
    const start: any = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the number of milliseconds between the two dates
    const millisecondsPerDay = 86400000; // Number of milliseconds in a day
    const timeDiff = end.getTime() - start.getTime();

    // Calculate the number of days between the two dates, rounded down to the nearest integer
    const daysBetween = Math.floor(timeDiff / millisecondsPerDay);

    // Calculate the number of days that have passed since the start date, rounded down to the nearest integer
    //@ts-ignore
    const daysPassed = Math.floor((new Date() - start) / millisecondsPerDay);

    // Calculate the completed days percentage
    const completedPercentage = Math.floor((daysPassed / daysBetween) * 100);

    return {daysBetween, daysPassed, completedPercentage};
  };

  const getVisionBoardDetails = async (_id: any) => {
    setLoading(true);

    try {
      const visionBoard: any = await realm.objectForPrimaryKey(
        'VisionBoard',
        _id,
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
      setLoading(true);
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
    let total_practiced = visionDetails?.total_practiced;
    const visionBoard: any = await realm.objectForPrimaryKey(
      'VisionBoard',
      visionBoardId,
    );
    if (!visionBoard) {
      throw new Error(`Could not find VisionBoard with id ${visionBoardId}`);
    }

    console.log(total_practiced, 'fffffffffffff');
    await realm.write(() => {
      visionBoard.total_practiced = total_practiced + 1;
    });
  };

  return {
    loading,
    error,
    getVisionBoardDetails,
    visionDetails,
    getDaysBetweenDates,
    addAffirmationToVisionBoard,
    deleteVisionBoard,
    updatePractice,
  };
};
