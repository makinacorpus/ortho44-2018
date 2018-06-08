const mediaTypes = [
  'drone',
  // 'photo',
  // 'photos',
  // 'video',
  // '360',
].reduce((acc, id) => ({
  ...acc,
  [id]: require(`../img/media-${id}.png`), // eslint-disable-line import/no-dynamic-require, global-require
}), {});

export default mediaTypes;
