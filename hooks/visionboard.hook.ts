import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
//@ts-ignore
import SQLite from 'react-native-sqlite-storage';
import {executeSql, getDBConnection} from './db.hook';
import {CameraRoll} from 'react-native';
import RNFS from 'react-native-fs';

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
  const [affirmations, setAffirmations] = useState<any>([]);
  const [title, setTitle] = useState('');
  const navigation = useNavigation();
  const createVisionBoard = async (title: string) => {
    try {
      const db = await getDBConnection();
      const sql = 'INSERT INTO visionBoards (title) VALUES (?)';
      const args = [title];
      const result: any = await executeSql(sql, args, db);

      const visionBoardId = result.insertId;
      console.log(`Created new vision board with ID: ${visionBoardId}`);

      // Save each affirmation image to device and then save the affirmation to the database
      const affirmationPromises = affirmations.map(async (affirmation: any) => {
        const savedImageUrl = await saveImageToDevice(affirmation.imageSource);
        const affirmationSql =
          'INSERT INTO affirmations (affirmation, imageUrl, createdAt, updatedAt, visionBoardId) VALUES (?, ?, ?, ?, ?)';
        const affirmationArgs = [
          affirmation.affirmation,
          savedImageUrl,
          Date.now(),
          Date.now(),
          visionBoardId,
        ];
        return executeSql(affirmationSql, affirmationArgs, db).then(res =>
          console.log(res, 'this is result'),
        );
      });
      await Promise.all(affirmationPromises);

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
  const [visionBoards, setVisionBoards] = useState<any>([]);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTable = async () => {
    try {
      const db = await getDBConnection();

      // Create visionBoards table
      const createVisionBoardsSql = `CREATE TABLE IF NOT EXISTS visionBoards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL
    )`;
      await executeSql(createVisionBoardsSql, [], db);

      // Create affirmations table
      const createAffirmationsSql = `CREATE TABLE IF NOT EXISTS affirmations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      affirmation TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      createdAt INTEGER NOT NULL,
      updatedAt INTEGER NOT NULL,
      visionBoardId INTEGER NOT NULL,
      FOREIGN KEY(visionBoardId) REFERENCES visionBoards(id) ON DELETE CASCADE
    )`;
      await executeSql(createAffirmationsSql, [], db);
    } catch (error: any) {
      console.error(error);
      setError(error);
    }
  };

  const getVisionBoards = async () => {
    setLoading(true);
    try {
      await createTable();

      const db = await getDBConnection();
      const sql =
        'SELECT * FROM visionBoards LEFT JOIN affirmations ON visionBoards.id = affirmations.visionBoardId';
      const results: any = await executeSql(sql, [], db);

      const len = results.rows.length;
      const visionBoardsData: any = [];
      for (let i = 0; i < len; i++) {
        const row = results.rows.item(i);

        // check if this is a new vision board
        if (
          !visionBoardsData.some(
            (visionBoard: any) => visionBoard.id === row.visionBoardId,
          )
        ) {
          const visionBoard = {
            id: row.visionBoardId,
            title: row.title,
            affirmations: [],
          };
          visionBoardsData.push(visionBoard);
        }

        // add the affirmation to the corresponding vision board
        const visionBoardIndex = visionBoardsData.findIndex(
          (visionBoard: any) => visionBoard.id === row.visionBoardId,
        );
        const affirmationLcal: any = {
          id: row.id,
          affirmation: row.affirmation,
          imageUrl: row.imageUrl,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        };
        visionBoardsData[visionBoardIndex].affirmations.push(affirmationLcal);
      }

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
