import {Realm} from '@realm/react';

export class Task extends Realm.Object<Task> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  description!: string;
  isComplete: boolean = false;
  createdAt: Date = new Date();
  userId!: string;

  static primaryKey = '_id';

  constructor(realm: Realm, description: string, userId?: string) {
    super(realm, {description, userId: userId || '_SYNC_DISABLED_'});
  }
}
