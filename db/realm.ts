import Realm from 'realm';
import {createRealmContext} from '@realm/react';

export class VisionCard extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  title!: string;
  description!: string;
  createdAt!: Date;

  static schema = {
    name: 'VisionCard',
    properties: {
      _id: 'objectId',
      title: 'string',
      description: 'string',
      createdAt: 'date',
    },
    primaryKey: '_id',
  };
}

// export const MainDbContext = createRealmContext({
//   schema: [VisionCard.schema],
// });
