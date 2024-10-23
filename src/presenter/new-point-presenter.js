import { remove, render, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType } from '../constants';
import AddPointView from '../view/add-point-view';
import { isEscKey } from '../utilites/utils';

const DEFAULT_TYPE = 'flight';

const BLANK_TRIP_POINT = {
  'basePrice': 0,
  'dateFrom': '',
  'dateTo': '',
  'destination': {
    description: '',
    name: '',
    pictures: [],
  },
  'isFavorite': false,
  'offers': [],
  'type': DEFAULT_TYPE
};

class NewPointPresenter {
  #point = null;
  #destinationsModel = null;
  #offersModel = null;
  #tripListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #addPointComponent = null;

  constructor(tripListContainer, destinationsModel, offersModel, onDataChange, onDestroy) {
    this.#tripListContainer = tripListContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#addPointComponent !== null) {
      return;
    }

    this.#addPointComponent = new AddPointView(
      this.#point = BLANK_TRIP_POINT,
      this.#destinationsModel,
      this.#offersModel,
      this.#handleFormSubmit,
      this.#handleDeleteClick
    );

    render(this.#addPointComponent, this.#tripListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#addPointComponent === null) {
      return;
    }
    this.#handleDestroy();
    remove(this.#addPointComponent);
    this.#addPointComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#addPointComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#addPointComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#addPointComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}

export default NewPointPresenter;
