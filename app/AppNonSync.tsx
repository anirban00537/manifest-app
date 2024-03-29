import React, {useMemo} from 'react';

import {Task} from './models/Task';
import {RealmContext} from './models';
import {TaskManager} from './components/TaskManager';

const {useQuery} = RealmContext;

export const AppNonSync = () => {
  const result = useQuery(Task);

  const tasks = useMemo(() => result.sorted('createdAt'), [result]);

  return <TaskManager tasks={tasks} />;
};
