import { useSelector } from 'react-redux';
import { useTranslation } from '../../common/components/LocalizationProvider';
import { useAttributePreference } from '../../common/util/preferences';

const sourceCustom = (urls) => ({
  type: 'raster',
  tiles: urls,
  tileSize: 256,
  maxzoom: 18,
});

const sourceOpenWeather = (style, key) => sourceCustom([
  `https://tile.openweathermap.org/map/${style}/{z}/{x}/{y}.png?appid=${key}`,
]);

export default () => {
  const t = useTranslation();

  const openWeatherKey = useAttributePreference('openWeatherKey');
  const tomTomKey = useAttributePreference('tomTomKey');
  const hereKey = useAttributePreference('hereKey');
  const customMapOverlay = useSelector((state) => state.session.server.overlayUrl);

  return [
    {
      id: 'openSeaMap',
      title: t('mapOpenSeaMap'),
      source: sourceCustom(['https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png']),
      available: true,
    },
    {
      id: 'openRailwayMap',
      title: t('mapOpenRailwayMap'),
      source: sourceCustom(['https://tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png']),
      available: true,
    },
    {
      id: 'openWeatherClouds',
      title: t('mapOpenWeatherClouds'),
      source: sourceOpenWeather('clouds_new', openWeatherKey),
      available: !!openWeatherKey,
      attribute: 'openWeatherKey',
    },
    {
      id: 'openWeatherPrecipitation',
      title: t('mapOpenWeatherPrecipitation'),
      source: sourceOpenWeather('precipitation_new', openWeatherKey),
      available: !!openWeatherKey,
      attribute: 'openWeatherKey',
    },
    {
      id: 'openWeatherPressure',
      title: t('mapOpenWeatherPressure'),
      source: sourceOpenWeather('pressure_new', openWeatherKey),
      available: !!openWeatherKey,
      attribute: 'openWeatherKey',
    },
    {
      id: 'openWeatherWind',
      title: t('mapOpenWeatherWind'),
      source: sourceOpenWeather('wind_new', openWeatherKey),
      available: !!openWeatherKey,
      attribute: 'openWeatherKey',
    },
    {
      id: 'openWeatherTemperature',
      title: t('mapOpenWeatherTemperature'),
      source: sourceOpenWeather('temp_new', openWeatherKey),
      available: !!openWeatherKey,
      attribute: 'openWeatherKey',
    },
    {
      id: 'tomTomFlow',
      title: t('mapTomTomFlow'),
      source: sourceCustom([`https://api.tomtom.com/traffic/map/4/tile/flow/absolute/{z}/{x}/{y}.png?key=${tomTomKey}`]),
      available: !!tomTomKey,
      attribute: 'tomTomKey',
    },
    {
      id: 'tomTomIncidents',
      title: t('mapTomTomIncidents'),
      source: sourceCustom([`https://api.tomtom.com/traffic/map/4/tile/incidents/s3/{z}/{x}/{y}.png?key=${tomTomKey}`]),
      available: !!tomTomKey,
      attribute: 'tomTomKey',
    },
    {
      id: 'hereFlow',
      title: t('mapHereFlow'),
      source: sourceCustom(
        [1, 2, 3, 4].map((i) => `https://${i}.traffic.maps.ls.hereapi.com/maptile/2.1/flowtile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey=${hereKey}`),
      ),
      available: !!hereKey,
      attribute: 'hereKey',
    },
    {
      id: 'custom',
      title: t('mapOverlayCustom'),
      source: sourceCustom(customMapOverlay),
      available: !!customMapOverlay,
    },
    {
      id: 'lifeguardStations',
      title: t('mapLifeguardStations'),
      source: sourceCustom(['https://geoserver.eventtracking.nl/geoserver/thetrackingsolution/wms?Version=1.1.0&Layers=thetrackingsolution:Reddingsposten&Request=GetMap&BBox={bbox-epsg-3857}&Width=256&Height=256&Format=image/png&Transparent=true&srs=EPSG:3857']),
      available: true,
    },
    {
      id: 'knrmStations',
      title: t('mapKnrmStations'),
      source: sourceCustom(['https://geoserver.eventtracking.nl/geoserver/thetrackingsolution/wms?Version=1.1.0&Layers=thetrackingsolution:KNRM_stations&Request=GetMap&BBox={bbox-epsg-3857}&Width=256&Height=256&Format=image/png&Transparent=true&srs=EPSG:3857']),
      available: true,
    },
    {
      id: 'beachPolesLayer',
      title: t('mapBeachPoles'),
      source: sourceCustom(['https://geoserver.eventtracking.nl/geoserver/thetrackingsolution/wms?Version=1.1.0&Layers=thetrackingsolution:Strandpalen&Request=GetMap&BBox={bbox-epsg-3857}&Width=256&Height=256&Format=image/png&Transparent=true&srs=EPSG:3857']),
      available: true,
    },
    {
      id: 'ambulanceTransferPlaces',
      title: t('mapAmbulanceTransferPlaces'),
      source: sourceCustom(['https://geoserver.eventtracking.nl/geoserver/thetrackingsolution/wms?Service=WMS&Version=1.1.0&Layers=thetrackingsolution:AOP&Request=GetMap&Tiled=true&TilesOrigin={x},{y}&BBox={bbox-epsg-3857}&Width=256&Height=256&Format=image/png&Transparent=true&srs=EPSG:3857']),
      available: true,
    },
    {
      id: 'aerialPhoto',
      title: t('mapAerialPhoto'),
      source: sourceCustom(['https://geoserver.eventtracking.nl/geoserver/thetrackingsolution/wms?Service=WMS&Version=1.1.0&Layers=thetrackingsolution:luchtfoto&Tiled=true']),
      available: true,
    },
  ];
};
