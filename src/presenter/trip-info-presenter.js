import TripInfoView from '../view/trip-info-view';
import { render, replace, remove, RenderPosition } from '../framework/render.js';

class TripInfoPresenter {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #mainContainer = null;
  #tripInfoComponent = null;

  constructor(pointsModel, destinationsModel, offersModel, tripMainElement) {
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#mainContainer = tripMainElement;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView(
      this.#pointsModel.points,
      this.#destinationsModel.destinations,
      this.#offersModel.offers
    );

    if (!prevTripInfoComponent) {
      render(this.#tripInfoComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);

    render(this.#tripInfoComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = () => {
    this.init();
  };
}

export default TripInfoPresenter;
