import TripSortView from '../view/trip-sort-view';
import TripEventListView from '../view/event-list-view/trip-event-list-view';
import ListEmptyView from '../view/list-empty-view';
import { remove, render } from '../framework/render.js';
import TripEventPresenter from './trip-event-presenter';
import NewPointPresenter from './new-point-presenter';
import { SortingType, UpdateType, UserAction, FilterType, TimeLimit } from '../constants';
import { sortPointEventsByPrice, sortPointEventsByTime } from '../utilites/point';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { filter } from '../utilites/filter';
import LoadingView from '../view/loading-view';

class ContentPresenter {
  #contentContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filtersModel = null;
  #messageComponent = null;

  #currentSortType = SortingType.DAY;
  #sortComponent = null;
  #noPointComponent = null;
  #filterType = FilterType.EVERYTHING;
  #tripListComponent = new TripEventListView();
  #emptyListComponent = new ListEmptyView();
  #loadingComponent = new LoadingView();
  #tripEventPresenters = new Map();
  #newPointPresenter = null;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor(contentContainer, pointsModel, offersModel, destinationsModel, filtersModel, onNewPointDestroy) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filtersModel = filtersModel;

    this.#newPointPresenter = new NewPointPresenter(
      this.#tripListComponent.element,
      this.#destinationsModel,
      this.#offersModel,
      this.#handleViewAction,
      onNewPointDestroy
    );

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get pointEvents() {
    this.#filterType = this.#filtersModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortingType.TIME:
        return filteredPoints.sort(sortPointEventsByTime);
      case SortingType.PRICE:
        return filteredPoints.sort(sortPointEventsByPrice);
    }
    return filteredPoints;
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

  createPoint() {
    this.#currentSortType = SortingType.DAY;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
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
    this.#emptyListComponent = new ListEmptyView(this.#filterType);
    render(this.#emptyListComponent, this.#contentContainer);
  }

  #renderSort() {
    this.#sortComponent = new TripSortView(this.#currentSortType, this.#handleSortTypeChange);
    render(this.#sortComponent, this.#contentContainer);
  }

  #renderContent() {
    const points = this.pointEvents;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.pointEvents.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSort();
    render(this.#tripListComponent, this.#contentContainer);
    this.#renderTripEvents(points);
  }

  #renderError() {
    this.#messageComponent = new ListEmptyView('ERROR');
    render(this.#messageComponent, this.#contentContainer);
  }

  #clearContent({ resetSortType = false } = {}) {
    this.#newPointPresenter.destroy();
    this.#tripEventPresenters.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortingType.DAY;
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#tripEventPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#tripEventPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#tripEventPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#tripEventPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#tripEventPresenters.get(data.id).init(data, this.#destinationsModel, this.#offersModel);
        break;
      case UpdateType.MINOR:
        this.#clearContent();
        this.#renderContent();
        break;
      case UpdateType.MAJOR:
        this.#clearContent({ resetSortType: true });
        this.#renderContent();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderContent();
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderError();
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
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

  #renderLoading() {
    render(this.#loadingComponent, this.#contentContainer);
  }
}

export default ContentPresenter;
