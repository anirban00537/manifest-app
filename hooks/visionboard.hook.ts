import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
//@ts-ignore
import SQLite from 'react-native-sqlite-storage';
import {executeSql, getDBConnection} from './db.hook';

export const useVisionBoardCreate = () => {
  const navigation = useNavigation();
  const createVisionBoard = async (title: string) => {
    try {
      const db = await getDBConnection();
      const sql = 'INSERT INTO visionBoards (title) VALUES (?)';
      const args = [title];
      const result: any = await executeSql(sql, args, db);

      console.log(`Created new vision board with ID: ${result.insertId}`);
      navigation.goBack();
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

  const createTable = async () => {
    try {
      const sql = `CREATE TABLE IF NOT EXISTS visionBoards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
      )`;
      const db = await getDBConnection();

      await executeSql(sql, [], db);
    } catch (e: any) {
      console.error(e);
      setError(e);
    }
  };

  const getVisionBoards = async () => {
    setLoading(true);
    try {
      await createTable();

      const sql = 'SELECT * FROM visionBoards';
      const db = await getDBConnection();
      const results: any = await executeSql(sql, [], db);

      const len = results.rows.length;
      const visionBoardsData = [];
      for (let i = 0; i < len; i++) {
        const row = results.rows.item(i);
        visionBoardsData.push({
          id: row.id,
          title: row.title,
        });
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
