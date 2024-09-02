import FilterPresenter from './presenter/filter-presenter';
import ContentPresenter from './presenter/content-presenter';

const siteHeaderElement = document.querySelector('.page-header');
const siteTripControlsElement = siteHeaderElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

const filterPresenter = new FilterPresenter({ filterContainer: siteTripControlsElement });
const contentPresenter = new ContentPresenter({ contentContainer: tripEventsElement });

filterPresenter.init();
contentPresenter.init();
