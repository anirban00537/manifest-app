import {Realm} from '@realm/react';

// Define the Affirmation schema

export class Affirmation extends Realm.Object<Affirmation> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  affirmation!: string;
  imageUrl!: string;
  visionboard_id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  createdAt: Date = new Date();
  updatedAt: Date = new Date();
  static primaryKey = '_id';

  constructor(
    realm: Realm,
    affirmation: string,
    imageUrl?: string,
    visionboard_id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId(),
  ) {
    super(realm, {affirmation, imageUrl, visionboard_id});
  }
}
