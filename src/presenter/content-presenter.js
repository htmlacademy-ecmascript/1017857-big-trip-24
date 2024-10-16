import TripSortView from '../view/trip-sort-view';
import TripEventListView from '../view/event-list-view/trip-event-list-view';
import ListEmptyView from '../view/list-empty-view';
import {remove, render} from '../framework/render.js';
import TripEventPresenter from './trip-event-presenter';
import { SortingType, UpdateType, UserAction } from '../constants';
import { sortPointEventsByPrice, sortPointEventsByTime } from '../utilites/point';

class ContentPresenter {
  #contentContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #currentSortType = SortingType.DAY;
  #sortComponent = null;
  #tripListComponent = new TripEventListView();
  #emptyListComponent = new ListEmptyView();
  #tripEventPresenters = new Map();

  constructor(contentContainer, pointsModel, offersModel, destinationsModel) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent)
  }

  get pointEvents() {
    switch (this.#currentSortType) {
      case SortingType.TIME:
        return[...this.#pointsModel.points].sort(sortPointEventsByTime)
      case SortingType.PRICE:
        return[...this.#pointsModel.points].sort(sortPointEventsByPrice);
    }
    return this.#pointsModel.points;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init() {
    this.#renderContent();
  }

  #renderTripEventItem(point) {
    const tripEventPresenter = new TripEventPresenter(
      this.#tripListComponent.element,
      this.#handleViewAction,
      this.#handleModeChange
    );
    tripEventPresenter.init(point, this.#destinationsModel, this.#offersModel);
    this.#tripEventPresenters.set(point.id, tripEventPresenter);
  }

  #renderTripEvents(points) {
    points.forEach((point) => this.#renderTripEventItem(point));
  }

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#contentContainer);
  }

  #renderSort() {
    this.#sortComponent = new TripSortView(this.#currentSortType, this.#handleSortTypeChange);
    render(this.#sortComponent, this.#contentContainer);
  }

  #renderContent() {
    const points = this.pointEvents;
    if (this.pointEvents.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSort();
    render(this.#tripListComponent, this.#contentContainer);
    this.#renderTripEvents(points);
  }


  #clearContent({resetSortType = false} = {}) {
    const pointCount = this.pointEvents.length;

    this.#tripEventPresenters.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#emptyListComponent);

    if (resetSortType) {
      this.#currentSortType = SortingType.DAY;
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(data)
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripEventPresenters.get(data.id).init(data, this.#destinationsModel, this.#offersModel);
        break;
      case UpdateType.MINOR:
        this.#clearContent();
        this.#renderContent();
        break;
      case UpdateType.MAJOR:
        this.#clearContent({resetSortType: true});
        this.#renderContent();
        break;
    }
  };

  #handleModeChange = () => {
    this.#tripEventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearContent();
    this.#renderContent();
  };
}

export default ContentPresenter;
