import TripPresenter from './presenter/trip-presenter';
import ContentPresenter from './presenter/content-presenter';
import TripFilterPresenter from './presenter/trip-filter-presenter';

import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';

import FilterModel from "./model/filter-model";

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = document.querySelector('.trip-main');
const siteTripControlsElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');


const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filtersModel = new FilterModel();
const filters = [
  {
    type: 'everything',
    count: 0 // TODO: возможно удалить, если не используется
  }
]
const tripPresenter = new TripPresenter(tripMainElement, siteTripControlsElement);
const tripFilterPresenter = new TripFilterPresenter(siteTripControlsElement, filtersModel, pointsModel);
const contentPresenter = new ContentPresenter(tripEventsElement, pointsModel, offersModel, destinationsModel, filtersModel);

tripPresenter.init();
tripFilterPresenter.init();
contentPresenter.init();
