export const CENTER_LATITUDE =  25;
export const CENTER_LONGITUDE = -40;

export const MAP_CENTER = [
  CENTER_LONGITUDE,
  CENTER_LATITUDE,
];

export const MAP_ZOOM = 3

export const MAP_BASELAYERS = [
  'light',
  'satellite',
].map(layer => ({
  style: `mapbox://styles/mapbox/${ layer }-v9`,
  title: layer,
  thumbnail: `/thumbnails/${ layer }.png`
}));

export const MAP_BASELAYER_DEFAULT = MAP_BASELAYERS[0];
