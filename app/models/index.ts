import {createRealmContext} from '@realm/react';
import {Task} from './Task';
import {VisionBoard, Affirmation} from './VisionBoard';

export const RealmContext = createRealmContext({
  schema: [VisionBoard, Affirmation],
});
