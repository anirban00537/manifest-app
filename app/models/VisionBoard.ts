import {Realm} from '@realm/react';

interface Affirmation {
  affirmation: string;
  imageSource: string;
}

export class VisionBoard extends Realm.Object<VisionBoard> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  title!: string;
  createdAt: Date = new Date();
  updatedAt: Date = new Date();

  constructor(realm: Realm, title: string) {
    super(realm, {title});
  }
}
