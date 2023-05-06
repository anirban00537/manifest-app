import {createRealmContext} from '@realm/react';
import {Task} from './Task';
import {VisionBoard} from './VisionBoard';

export const RealmContext = createRealmContext({
  schema: [Task, VisionBoard],
});
