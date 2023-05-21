import {createRealmContext} from '@realm/react';
import {VisionBoard, Affirmation, PracticeTimeLog} from './VisionBoard';

export const RealmContext = createRealmContext({
  schema: [VisionBoard, Affirmation, PracticeTimeLog],
});
