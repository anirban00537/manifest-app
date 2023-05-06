export const VisionBoardImage = {
  name: 'VisionBoardImage',
  properties: {
    url: 'string',
    title: 'string',
    caption: 'string',
  },
};
export const VisionBoard = {
  name: 'VisionBoard',
  properties: {
    _id: 'objectId',
    title: 'string',
    createdAt: 'date',
    updatedAt: 'date',
    images: {type: 'list', objectType: 'VisionBoardImage'},
  },
};
