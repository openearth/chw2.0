import buildGeoserverUrl from './build-geoserver-url';

export default (layer, width = 40, height = 60, scale, url) => buildGeoserverUrl({
  url,
  request: 'GetLegendGraphic',
  service: 'WMS',
  format: 'image/png',
  width,
  height,
  layer,
  scale
});
