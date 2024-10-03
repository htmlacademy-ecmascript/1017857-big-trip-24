import TripPresenter from './presenter/trip-presenter';
import ContentPresenter from './presenter/content-presenter';
import TripFilterPresenter from './presenter/trip-filter-presenter';

import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import { generateFilter } from './mock/filters';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = document.querySelector('.trip-main');
const siteTripControlsElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');


const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filters = generateFilter(pointsModel);
const tripPresenter = new TripPresenter(tripMainElement, siteTripControlsElement);
const tripFilterPresenter = new TripFilterPresenter(siteTripControlsElement, filters);
const contentPresenter = new ContentPresenter(tripEventsElement, pointsModel, offersModel, destinationsModel);

tripPresenter.init();
tripFilterPresenter.init();
contentPresenter.init();
