import {createRealmContext} from '@realm/react';
import {Task} from './Task';
import {Affirmation} from './Affirmation';
import {VisionBoard} from './VisionBoard';

export const RealmContext = createRealmContext({
  schema: [Task, Affirmation, VisionBoard],
});
