import TripInfoPresenter from './presenter/trip-info-presenter';
import ContentPresenter from './presenter/content-presenter';
import TripFilterPresenter from './presenter/trip-filter-presenter';
import PointApiService from './point-api-service';

import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';

import FilterModel from './model/filter-model';
import NewPointButtonView from './view/new-point-button-view';
import { render } from './framework/render';

const AUTHORIZATION = 'Basic df341650bc71d6f4';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';
const tripApiService = new PointApiService(END_POINT, AUTHORIZATION);

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = document.querySelector('.trip-main');
const siteTripControlsElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');


const offersModel = new OffersModel(tripApiService);
const destinationsModel = new DestinationsModel(tripApiService);
const pointsModel = new PointsModel(tripApiService, destinationsModel, offersModel);

const filtersModel = new FilterModel();

const tripInfoPresenter = new TripInfoPresenter(pointsModel, destinationsModel, offersModel, tripMainElement);
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

tripInfoPresenter.init();
tripFilterPresenter.init();
contentPresenter.init();
pointsModel.init().finally(() => {
  render(newPointButtonComponent, tripMainElement);
});

