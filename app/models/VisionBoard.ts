export const Affirmation = {
  name: 'Affirmation',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    url: 'string',
    title: 'string',
    createdAt: {type: 'date', default: new Date()},
    updatedAt: {type: 'date', default: new Date()},
  },
};
export const VisionBoard = {
  name: 'VisionBoard',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    title: 'string',
    endDate: {type: 'date', default: new Date()},
    createdAt: {type: 'date', default: new Date()},
    updatedAt: {type: 'date', default: new Date()},
    affirmation: {type: 'list', objectType: 'Affirmation'},
  },
};
