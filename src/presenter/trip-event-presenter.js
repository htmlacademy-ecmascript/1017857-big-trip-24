import { render, replace, remove } from '../framework/render';
import TripEventItemView from '../view/event-list-view/trip-event-item-view';
import EditPointView from '../view/edit-point-view';

class TripEventPresenter {
  #tripListContainer = null;

  #tripEventComponent = null;
  #editPointComponent = null;

  #point = null;
  #destination = null;
  #offers = null;
  #currentPoint = null;
  #availableOffers = null;
  #currentDestination = null;
  #offerTypes = null;
  #pointOffers = null;

  constructor(
    tripListContainer
  ) {
    this.#tripListContainer = tripListContainer;
  }

  init(
    point,
    destination,
    offers,
    currentPoint,
    availableOffers,
    currentDestination,
    offerTypes,
    pointOffers
  ) {
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
    this.#currentPoint = currentPoint;
    this.#availableOffers = availableOffers;
    this.#currentDestination = currentDestination;
    this.#offerTypes = offerTypes;
    this.#pointOffers = pointOffers;
    this.#currentDestination = currentDestination;

    const prevTripEventComponent = this.#tripEventComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#tripEventComponent = new TripEventItemView(
      this.#point,
      this.#destination,
      this.#offers,
      this.#onEditClick
    );

    this.#editPointComponent = new EditPointView(
      this.#currentPoint,
      this.#availableOffers,
      this.#currentDestination,
      this.#offerTypes,
      this.#pointOffers,
      this.#onFormSubmit
    );

    if (prevTripEventComponent === null || prevEditPointComponent === null) {
      render(this.#tripEventComponent, this.#tripListContainer);
      return;
    }

    if (this.#tripListContainer.contains(prevTripEventComponent.element)) {
      replace(this.#tripEventComponent, prevTripEventComponent);
    }

    if (this.#tripListContainer.contains(prevEditPointComponent.element)) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevTripEventComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#tripEventComponent);
    remove(this.#editPointComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #onEditClick = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #onFormSubmit = () => {
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceCardToForm() {
    replace(this.#editPointComponent, this.#tripEventComponent);
  }

  #replaceFormToCard() {
    replace(this.#tripEventComponent, this.#editPointComponent);
  }
}

export default TripEventPresenter;
