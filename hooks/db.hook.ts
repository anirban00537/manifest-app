//@ts-ignore
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

const DATABASE_NAME = 'mydb.db';
const DATABASE_VERSION = '1.0';
const DATABASE_DISPLAYNAME = 'My Database';
const DATABASE_SIZE = 200000;
export const getDBConnection = async () => {
  return SQLite.openDatabase({
    name: DATABASE_NAME,
    version: DATABASE_VERSION,
    displayName: DATABASE_DISPLAYNAME,
    size: DATABASE_SIZE,
  });
};

export const executeSql = (sql: string, args: any[] = [], db: any) =>
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
