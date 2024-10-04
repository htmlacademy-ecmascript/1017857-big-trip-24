import TripSortView from '../view/trip-sort-view';
import TripEventListView from '../view/event-list-view/trip-event-list-view';
import ListEmptyView from '../view/list-empty-view';
import { render } from '../framework/render.js';
import TripEventPresenter from './trip-event-presenter';
import { updateItem } from '../utilites/common';

class ContentPresenter {
  #contentContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #sortComponent = new TripSortView();
  #tripListComponent = new TripEventListView();
  #emptyListComponent = new ListEmptyView();
  #tripEventPresenters = new Map();
  #pointEvents = [];

  constructor(contentContainer, pointsModel, offersModel, destinationsModel) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#pointEvents = [...this.#pointsModel.points];
    this.#renderContent();
  }

  #renderTripEventItem(
    point,
    destination,
    offers,
    currentPoint,
    availableOffers,
    currentDestination,
    offerTypes,
    pointOffers
  ) {
    const tripEventPresenter = new TripEventPresenter(
      this.#tripListComponent.element,
      this.#handlePointEventChange,
      this.#handleModeChange
    );
    tripEventPresenter.init(
      point,
      destination,
      offers,
      currentPoint,
      availableOffers,
      currentDestination,
      offerTypes,
      pointOffers
    );
    this.#tripEventPresenters.set(point.id, tripEventPresenter);
  }

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#contentContainer);
  }

  #renderSort() {
    render(this.#sortComponent, this.#contentContainer);
  }

  #renderTripEventList() {
    render(this.#tripListComponent, this.#contentContainer);
    for (let i = 0; i < this.#pointEvents.length; i++) {
      this.#renderTripEventItem(
        this.#pointEvents[i],
        this.#destinationsModel.getDestinationsById(this.#pointEvents[i].destination),
        this.#offersModel.getOffersById(this.#pointEvents[i].type, this.#pointEvents[i].offers),
        this.#pointEvents[i].id,
        this.#offersModel.getOffersByType(this.#pointEvents[i].type),
        this.#destinationsModel.getDestinationsById(this.#pointEvents[i].destination),
        this.#offersModel.getOffersType(),
        this.#offersModel.getOffersById(this.#pointEvents[i].type, this.#pointEvents[i].offers)
      );
    }
  }

  #renderContent() {
    if (this.#pointEvents.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSort();
    this.#renderTripEventList();
  }

  #clearTripEventList() {
    this.#tripEventPresenters.forEach((presenter) => presenter.destroy());
    this.#tripEventPresenters.clear();
  }

  #handlePointEventChange = (updatedPoint) => {
    this.#pointEvents = updateItem(this.#pointEvents, updatedPoint);
    this.#tripEventPresenters.get(updatedPoint.id).init(
      updatedPoint,
      this.#destinationsModel.getDestinationsById(updatedPoint.destination),
      this.#offersModel.getOffersById(updatedPoint.type, updatedPoint.offers),
      updatedPoint.id,
      this.#offersModel.getOffersByType(updatedPoint.type),
      this.#destinationsModel.getDestinationsById(updatedPoint.destination),
      this.#offersModel.getOffersType(),
      this.#offersModel.getOffersById(updatedPoint.type, updatedPoint.offers)
    );
  };

  #handleModeChange = () => {
    this.#tripEventPresenters.forEach((presenter) => presenter.resetView());
  };
}

export default ContentPresenter;
