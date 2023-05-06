import {createRealmContext} from '@realm/react';
import {Task} from './Task';
import {Affirmation} from './Affirmation';
import {VisionBoard, VisionBoardImage} from './VisionBoard';

export const RealmContext = createRealmContext({
  schema: [VisionBoard, VisionBoardImage],
});
