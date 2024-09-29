import TripSortView from '../view/trip-sort-view';
import EditPointView from '../view/edit-point-view';
import TripEventListView from '../view/event-list-view/trip-event-list-view';
import TripEventItemView from '../view/event-list-view/trip-event-item-view';
import { render } from '../framework/render.js';
import AddPointView from '../view/add-point-view';

class ContentPresenter {
  #contentContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  sortComponent = new TripSortView();
  tripListComponent = new TripEventListView();

  constructor(contentContainer, pointsModel, offersModel, destinationsModel) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    const currentPoint = this.#pointsModel.getPointById(this.#pointsModel.points[0].id);
    const currentDestination = this.#destinationsModel.getDestinationsById(currentPoint.destination);
    const offerTypes = this.#offersModel.getOffersType();
    const availableOffers = this.#offersModel.getOffersByType(currentPoint.type);
    const availableDestinations = this.#destinationsModel.destinations;
    const pointOffers = this.#offersModel.getOffersById(currentPoint.type, currentPoint.offers);

    render(this.sortComponent, this.#contentContainer);
    render(new AddPointView(currentPoint, availableOffers, currentDestination, offerTypes, pointOffers, availableDestinations), this.tripListComponent.element);
    render(new EditPointView(currentPoint, availableOffers, currentDestination, offerTypes, pointOffers), this.tripListComponent.element);
    render(this.tripListComponent, this.#contentContainer);

    for (let i = 0; i < this.#pointsModel.points.length; i++) {
      render(new TripEventItemView(this.#pointsModel.points[i], this.#destinationsModel.getDestinationsById(this.#pointsModel.points[i].destination), this.#offersModel.getOffersById(this.#pointsModel.points[i].type, this.#pointsModel.points[i].offers)), this.tripListComponent.element);
    }
  }
}

export default ContentPresenter;
