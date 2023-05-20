import {createRealmContext} from '@realm/react';
import {VisionCard} from './visioncard.model';

export const RealmContext = createRealmContext({
  schema: [VisionCard],
});
