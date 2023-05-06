import {Realm} from '@realm/react';

export class VisionBoard extends Realm.Object<VisionBoard> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  title!: string;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  static primaryKey = '_id';

  constructor(realm: Realm, title: string) {
    super(realm, {title});
  }
}
