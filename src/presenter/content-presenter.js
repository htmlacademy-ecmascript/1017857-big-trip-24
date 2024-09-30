import TripSortView from '../view/trip-sort-view';
import EditPointView from '../view/edit-point-view';
import TripEventListView from '../view/event-list-view/trip-event-list-view';
import TripEventItemView from '../view/event-list-view/trip-event-item-view';
import { render, replace } from '../framework/render.js';

class ContentPresenter {
  #contentContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #sortComponent = new TripSortView();
  #tripListComponent = new TripEventListView();

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
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const onEditClick = () => {
      replaceCardToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    };

    const onFormSubmit = () => {
      replaceFormToCard();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const tripEventComponent = new TripEventItemView(
      point,
      destination,
      offers,
      onEditClick
    );
    const editPointComponent = new EditPointView(
      currentPoint,
      availableOffers,
      currentDestination,
      offerTypes,
      pointOffers,
      onFormSubmit
    );

    function replaceCardToForm() {
      replace(editPointComponent, tripEventComponent);
    }

    function replaceFormToCard() {
      replace(tripEventComponent, editPointComponent);
    }
    render(tripEventComponent, this.#tripListComponent.element);
  }

  init() {
    render(this.#sortComponent, this.#contentContainer);
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
}

export default ContentPresenter;
