import TripSortView from '../view/trip-sort-view';
import TripEventListView from '../view/event-list-view/trip-event-list-view';
import ListEmptyView from '../view/list-empty-view';
import { render } from '../framework/render.js';
import TripEventPresenter from './trip-event-presenter';

class ContentPresenter {
  #contentContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #sortComponent = new TripSortView();
  #tripListComponent = new TripEventListView();
  #emptyListComponent = new ListEmptyView();

  constructor(contentContainer, pointsModel, offersModel, destinationsModel) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
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
      this.#tripListComponent.element
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
  }

  init() {
    this.#renderContent();
  }

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#contentContainer);
  }

  #renderSort() {
    render(this.#sortComponent, this.#contentContainer);
  }

  #renderTripEventList() {
    render(this.#tripListComponent, this.#contentContainer);
    for (let i = 0; i < this.#pointsModel.points.length; i++) {
      const currentPoint = this.#pointsModel.getPointById(this.#pointsModel.points[i].id);
      this.#renderTripEventItem(
        this.#pointsModel.points[i],
        this.#destinationsModel.getDestinationsById(this.#pointsModel.points[i].destination),
        this.#offersModel.getOffersById(this.#pointsModel.points[i].type, this.#pointsModel.points[i].offers),
        currentPoint,
        this.#offersModel.getOffersByType(currentPoint.type),
        this.#destinationsModel.getDestinationsById(currentPoint.destination),
        this.#offersModel.getOffersType(),
        this.#offersModel.getOffersById(currentPoint.type, currentPoint.offers)
      );
    }
  }

  #renderContent() {
    if (this.#pointsModel.points.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderSort();
    this.#renderTripEventList();
  }
}

export default ContentPresenter;
