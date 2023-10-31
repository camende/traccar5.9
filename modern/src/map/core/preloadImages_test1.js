import { grey } from '@mui/material/colors';
import createPalette from '@mui/material/styles/createPalette';
import { loadImage, prepareIcon } from './mapUtil';

import directionSvg from '../../resources/images/direction.svg';
import backgroundSvg from '../../resources/images/background.svg';
import background_lgSvg from '../../resources/images/background_lg.svg';
import animalSvg from '../../resources/images/icon/animal.svg';
import bicycleSvg from '../../resources/images/icon/bicycle.svg';
import boatSvg from '../../resources/images/icon/boat.svg';
import busSvg from '../../resources/images/icon/bus.svg';
import carSvg from '../../resources/images/icon/car.svg';
import craneSvg from '../../resources/images/icon/crane.svg';
import defaultSvg from '../../resources/images/icon/default.svg';
import helicopterSvg from '../../resources/images/icon/helicopter.svg';
import motorcycleSvg from '../../resources/images/icon/motorcycle.svg';
import offroadSvg from '../../resources/images/icon/offroad.svg';
import personSvg from '../../resources/images/icon/person.svg';
import pickupSvg from '../../resources/images/icon/pickup.svg';
import planeSvg from '../../resources/images/icon/plane.svg';
import scooterSvg from '../../resources/images/icon/scooter.svg';
import shipSvg from '../../resources/images/icon/ship.svg';
import tractorSvg from '../../resources/images/icon/tractor.svg';
import trainSvg from '../../resources/images/icon/train.svg';
import tramSvg from '../../resources/images/icon/tram.svg';
import trolleybusSvg from '../../resources/images/icon/trolleybus.svg';
import truckSvg from '../../resources/images/icon/truck.svg';
import vanSvg from '../../resources/images/icon/van.svg';
import rwcSvg from '../../resources/images/icon/rwc.svg';

export const mapIcons = {
  animal: { icon: animalSvg, backgroundSvg },
  bicycle: { icon: bicycleSvg, backgroundSvg },
  boat: { icon: boatSvg, backgroundSvg },
  bus: { icon: busSvg, backgroundSvg },
  car: { icon: carSvg, backgroundSvg },
  crane: { icon: craneSvg, backgroundSvg },
  default: { icon: defaultSvg, backgroundSvg },
  helicopter: { icon: helicopterSvg, backgroundSvg },
  motorcycle: { icon: motorcycleSvg, backgroundSvg },
  offroad: { icon: offroadSvg, backgroundSvg },
  person: { icon: personSvg, backgroundSvg },
  pickup: { icon: pickupSvg, backgroundSvg },
  plane: { icon: planeSvg, backgroundSvg },
  scooter: { icon: scooterSvg, backgroundSvg },
  ship: { icon: shipSvg, backgroundSvg },
  tractor: { icon: tractorSvg, backgroundSvg },
  train: { icon: trainSvg, backgroundSvg },
  tram: { icon: tramSvg, backgroundSvg },
  trolleybus: { icon: trolleybusSvg, backgroundSvg },
  truck: { icon: truckSvg, backgroundSvg },
  van: { icon: vanSvg, backgroundSvg },
  rwc: { icon: rwcSvg, background_lgSvg },
  

};

export const mapIconKey = (category) => (mapIcons.hasOwnProperty(category) ? category : 'default');

export const mapImages = {};

const mapPalette = createPalette({
  neutral: { main: grey[500] },
});

export default async () => {
  await Promise.all(Object.keys(mapIcons).map(async (category) => {
    const background = await loadImage(../../resources/images/${mapIcons[category].background});
    mapImages[${category}-background] = await prepareIcon(background);
  });

  await Promise.all(Object.keys(mapIcons).map(async (category) => {
    const results = [];
    ['info', 'success', 'error', 'neutral'].forEach((color) => {
      results.push(loadImage(mapIcons[category].icon).then((icon) => {
        mapImages[${category}-${color}] = prepareIcon(mapImages[${category}-background], icon, mapPalette[color].main);
      }));
    });
    await Promise.all(results);
});
};