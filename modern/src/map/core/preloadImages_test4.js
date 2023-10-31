import { grey } from '@mui/material/colors';
import createPalette from '@mui/material/styles/createPalette';
import { loadImage, prepareIcon } from './mapUtil';

//import directionSvg from '../../resources/images/direction.svg';
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
  animal: { icon: animalSvg, background: backgroundSvg },
  bicycle: { icon: bicycleSvg, background: backgroundSvg },
  boat: { icon: boatSvg, background: backgroundSvg },
  bus: { icon: busSvg, background: backgroundSvg },
  car: { icon: carSvg, background: backgroundSvg },
  crane: { icon: craneSvg, background: backgroundSvg },
  default: { icon: defaultSvg, background: backgroundSvg },
  helicopter: { icon: helicopterSvg, background: backgroundSvg },
  motorcycle: { icon: motorcycleSvg, background: backgroundSvg },
  offroad: { icon: offroadSvg, background: backgroundSvg },
  person: { icon: personSvg, background: backgroundSvg },
  pickup: { icon: pickupSvg, background: backgroundSvg },
  plane: { icon: planeSvg, background: backgroundSvg },
  scooter: { icon: scooterSvg, background: backgroundSvg },
  ship: { icon: shipSvg, background: backgroundSvg },
  tractor: { icon: tractorSvg, background: backgroundSvg },
  train: { icon: trainSvg, background: backgroundSvg },
  tram: { icon: tramSvg, background: backgroundSvg },
  trolleybus: { icon: trolleybusSvg, background: backgroundSvg },
  truck: { icon: truckSvg, background: backgroundSvg },
  van: { icon: vanSvg, background: backgroundSvg },
  rwc: { icon: rwcSvg, background: background_lgSvg },
};

export const mapIconKey = (category) => (mapIcons.hasOwnProperty(category) ? category : 'default');

export const mapImages = {};

const mapPalette = createPalette({
  neutral: { main: grey[500] },
});

export default async () => {
  const loadImageWithBackground = async (iconPath, backgroundPath) => {
    const background = await loadImage(backgroundPath);
    const icon = await loadImage(iconPath);
    return prepareIcon(background, icon, mapPalette.neutral.main);
  };

  await Promise.all(Object.keys(mapIcons).map(async (category) => {
    const iconPath = mapIcons[category].icon;
    const backgroundPath = mapIcons[category].background;
    const iconKey = `${category}-neutral`; // Gebruik backticks (`) om een sjabloonreeks te maken

    mapImages[iconKey] = await loadImageWithBackground(iconPath, backgroundPath);
  }));
};