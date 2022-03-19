export const CENTER_LATITUDE =  21.90;
export const CENTER_LONGITUDE = -39.12;

export const MAP_CENTER = [
  CENTER_LONGITUDE,
  CENTER_LATITUDE,
];

export const MAP_ZOOM = 3

export const MAP_BASELAYERS = [
  'iomic/cl02755g2000a14qn9pmoz4j2', 
  'mapbox/satellite-v9',
].map(layer => ({
  style: `mapbox://styles/${ layer }`,
  title: layer,
  thumbnail: `/thumbnails/${ layer }.png`
}));

export const MAP_BASELAYER_DEFAULT = MAP_BASELAYERS[0];
