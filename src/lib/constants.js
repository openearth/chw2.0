export const CENTER_LATITUDE =  36.90;
export const CENTER_LONGITUDE = -25.12;

export const MAP_CENTER = [
  CENTER_LONGITUDE,
  CENTER_LATITUDE,
];

export const MAP_ZOOM = 2.5

export const MAP_BASELAYERS = [
  'iomic/cl3ld9ecp005114p8o9eky4t0', 
  'mapbox/satellite-v9',
].map(layer => ({
  style: `mapbox://styles/${ layer }`,
  title: layer,
  thumbnail: `/thumbnails/${ layer }.png`
}));

export const MAP_BASELAYER_DEFAULT = MAP_BASELAYERS[0];

