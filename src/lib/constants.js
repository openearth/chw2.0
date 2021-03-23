export const NETHERLANDS_CENTER_LATITUDE =  49.42429;
export const NETHERLANDS_CENTER_LONGITUDE = 16.4747;

export const MAP_CENTER = [
  NETHERLANDS_CENTER_LONGITUDE,
  NETHERLANDS_CENTER_LATITUDE,
];

export const MAP_ZOOM = 2

export const MAP_BASELAYERS = [
  'light',
  'satellite',
].map(layer => ({
  style: `mapbox://styles/mapbox/${ layer }-v9`,
  title: layer,
  thumbnail: `/thumbnails/${ layer }.png`
}));

export const MAP_BASELAYER_DEFAULT = MAP_BASELAYERS[0];
