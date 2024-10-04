import { render, replace, remove } from '../framework/render';
import TripEventItemView from '../view/event-list-view/trip-event-item-view';
import EditPointView from '../view/edit-point-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

class TripEventPresenter {
  #tripListContainer = null;

  #tripEventComponent = null;
  #editPointComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #point = null;
  #destination = null;
  #offers = null;
  #currentPoint = null;
  #availableOffers = null;
  #currentDestination = null;
  #offerTypes = null;
  #pointOffers = null;
  #mode = Mode.DEFAULT;

  constructor(
    tripListContainer,
    onDataChange,
    onModeChange
  ) {
    this.#tripListContainer = tripListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
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
      this.#onEditClick,
      this.#handleFavoriteClick
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

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#tripEventComponent, prevTripEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevTripEventComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this.#tripEventComponent);
    remove(this.#editPointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
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

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#point, 'is_favorite': !this.#point.is_favorite });
  };

  #replaceCardToForm() {
    replace(this.#editPointComponent, this.#tripEventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#tripEventComponent, this.#editPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }
}

export default TripEventPresenter;
