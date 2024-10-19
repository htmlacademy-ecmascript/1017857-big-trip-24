import { render, replace, remove } from '../framework/render';
import TripEventItemView from '../view/event-list-view/trip-event-item-view';
import EditPointView from '../view/edit-point-view';
import { UserAction, UpdateType } from '../constants';
import { isDatesEqual } from '../utilites/point';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

class TripEventPresenter {
  #tripListContainer = null;
  #handleDataChange = null;

  #tripEventComponent = null;
  #editPointComponent = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;
  #destinationModel = null;
  #offersModel = null;
  #point = null;

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
    destinationModel,
    offersModel
  ) {
    this.#point = point;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;

    const prevTripEventComponent = this.#tripEventComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#tripEventComponent = new TripEventItemView(
      this.#point,
      this.#destinationModel.getDestinationsById(this.#point.destination),
      this.#offersModel.getOffersById(this.#point.type, this.#point.offers),
      this.#onEditClick,
      this.#handleFavoriteClick
    );

    this.#editPointComponent = new EditPointView(
      this.#point,
      this.#destinationModel.getDestinationsById(this.#point.destination),
      this.#offersModel.offers,
      this.#destinationModel.destinations,
      this.#offersModel.getOffersType(),
      this.#onFormSubmit,
      this.#onRollUpClick,
      this.#handleDeleteClick
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
      this.#editPointComponent.reset(
        this.#point,
        this.#destinationModel.getDestinationsById(this.#point.destination),
        this.#offersModel.offers,
        this.#destinationModel.destinations,
        this.#offersModel.getOffersType(),
      );
      this.#replaceFormToCard();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editPointComponent.reset(
        this.#point,
        this.#destinationModel.getDestinationsById(this.#point.destination),
        this.#offersModel.offers,
        this.#destinationModel.destinations,
        this.#offersModel.getOffersType(),
      );
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #onEditClick = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #onFormSubmit = (update) => {
    // Проверяем, поменялись ли в задаче данные, которые попадают под фильтрацию,
    // а значит требуют перерисовки списка - если таких нет, это PATCH-обновление
    const isMinorUpdate = !isDatesEqual(this.#point.dateFrom, update.dateFrom)

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #onRollUpClick = () => {
    this.#editPointComponent.reset(
      this.#point,
      this.#destinationModel.getDestinationsById(this.#point.destination),
      this.#offersModel.offers,
      this.#destinationModel.destinations,
      this.#offersModel.getOffersType(),
    );
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      { ...this.#point, 'is_favorite': !this.#point.is_favorite });
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

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    )
  }
}

export default TripEventPresenter;
