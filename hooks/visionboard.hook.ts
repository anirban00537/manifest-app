import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useEffect, useState} from 'react';
//@ts-ignore
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name: 'mydb.db',
  location: 'default',
});

export const useVisionBoardCreate = () => {
  const navigation = useNavigation();
  db.transaction((tx: any) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS visionBoards (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)',
      [],
      (tx: any, result: any) => {
        console.log('VisionBoards table created successfully.');
      },
      (error: any) => {
        console.error('Error creating VisionBoards table: ', error);
      },
    );
  });

  const createVisionBoard = async (title: string, description: string) => {
    try {
      const sql = 'INSERT INTO visionBoards (title, description) VALUES (?, ?)';
      const args = [title, description];
      const result: any = await executeSql(sql, args);

      console.log(`Created new vision board with ID: ${result.insertId}`);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const executeSql = (sql: string, args: any[] = []) =>
    new Promise((resolve, reject) => {
      db.transaction((tx: any) => {
        tx.executeSql(
          sql,
          args,
          (tx: any, result: any) => resolve(result),
          (error: any) => reject(error),
        );
      });
    });

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
      const sql = 'SELECT * FROM visionBoards';
      const results: any = await executeSql(sql);

      const len = results.rows.length;
      const visionBoardsData = [];
      for (let i = 0; i < len; i++) {
        const row = results.rows.item(i);
        visionBoardsData.push({
          id: row.id,
          title: row.title,
          description: row.description,
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

  const executeSql = (sql: string, args: any[] = []) =>
    new Promise((resolve, reject) => {
      db.transaction((tx: any) => {
        tx.executeSql(
          sql,
          args,
          (tx: any, result: any) => resolve(result),
          (error: any) => reject(error),
        );
      });
    });

  useEffect(() => {
    getVisionBoards();
  }, [isFocused]);

  return {visionBoards, loading, error};
};
