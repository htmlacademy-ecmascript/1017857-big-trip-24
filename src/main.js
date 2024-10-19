import TripPresenter from './presenter/trip-presenter';
import ContentPresenter from './presenter/content-presenter';
import TripFilterPresenter from './presenter/trip-filter-presenter';

import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';

import FilterModel from './model/filter-model';
import NewPointButtonView from "./view/new-point-button-view";
import {render} from "./framework/render";

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = document.querySelector('.trip-main');
const siteTripControlsElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');


const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filtersModel = new FilterModel();

const tripPresenter = new TripPresenter(tripMainElement, siteTripControlsElement);
const tripFilterPresenter = new TripFilterPresenter(siteTripControlsElement, filtersModel, pointsModel);
const contentPresenter = new ContentPresenter(tripEventsElement, pointsModel, offersModel, destinationsModel, filtersModel, handleNewPointFormClose);

const newPointButtonComponent = new NewPointButtonView(handleNewPointButtonClick);

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}
function handleNewPointButtonClick() {
  contentPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, tripMainElement);

tripPresenter.init();
tripFilterPresenter.init();
contentPresenter.init();
