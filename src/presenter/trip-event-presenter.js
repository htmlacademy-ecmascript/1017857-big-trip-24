import { render, replace } from '../framework/render';
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

  #tripEvent = null;
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

    render(this.#tripEventComponent, this.#tripListContainer);
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
