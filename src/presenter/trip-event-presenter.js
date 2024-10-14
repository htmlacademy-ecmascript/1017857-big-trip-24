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

  #mode = Mode.DEFAULT;
  #pointModel = null;
  #destinationModel = null;
  #offersModel = null;

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
    offers
  ) {
    this.#pointModel = point;
    this.#destinationModel = destination;
    this.#offersModel = offers;
    const prevTripEventComponent = this.#tripEventComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#tripEventComponent = new TripEventItemView(
      this.#pointModel,
      this.#destinationModel,
      this.#offersModel,
      this.#onEditClick,
      this.#handleFavoriteClick
    );

    this.#editPointComponent = new EditPointView(
      this.#pointModel,
      this.#destinationModel,
      this.#offersModel,
      this.#onFormSubmit,
      this.#onRollUpClick
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
      this.#editPointComponent.reset(this.#pointModel, this.#destinationModel, this.#offersModel);
      this.#replaceFormToCard();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#pointModel, this.#destinationModel, this.#offersModel);
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #onEditClick = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #onFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #onRollUpClick = () => {
    this.#editPointComponent.reset(this.#pointModel, this.#destinationModel, this.#offersModel);
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({ ...this.#pointModel, 'is_favorite': !this.#pointModel.is_favorite });
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
