import {remove, render, RenderPosition} from '../framework/render.js';
import {nanoid} from 'nanoid';
import { UserAction, UpdateType } from '../constants';
import AddPointView from '../view/add-point-view';

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
  'is_favorite': false,
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

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

}

export default NewPointPresenter;
