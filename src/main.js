import TripPresenter from './presenter/trip-presenter';
import ContentPresenter from './presenter/content-presenter';

import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = document.querySelector('.trip-main');
const siteTripControlsElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const tripPresenter = new TripPresenter(tripMainElement, siteTripControlsElement);
const contentPresenter = new ContentPresenter(tripEventsElement, pointsModel, offersModel, destinationsModel);

tripPresenter.init();
contentPresenter.init();
