export const Affirmation = {
  name: 'Affirmation',
  properties: {
    url: 'string',
    title: 'string',
  },
};
export const VisionBoard = {
  name: 'VisionBoard',
  primaryKey: '_id',
  properties: {
    _id: 'objectId',
    title: 'string',
    createdAt: 'date',
    updatedAt: 'date',
    affirmation: {type: 'list', objectType: 'Affirmation'},
  },
};
