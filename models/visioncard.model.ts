import {Realm} from '@realm/react';

export class VisionCard extends Realm.Object<VisionCard> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  title!: string;
  description!: string;
  createdAt: Date = new Date();

  static primaryKey = '_id';

  constructor(realm: Realm, description: string, title?: string) {
    super(realm, {description, title: title || '_SYNC_DISABLED_'});
  }
}
