import Observable from '../framework/observable';
import { UpdateType } from '../constants';

class DestinationsModel extends Observable {
  #pointsApiService = null;
  #destinations = [];

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#pointsApiService.destinations;
    } catch (err) {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  }

  getDestinationsById(id) {
    const availableDestinations = this.destinations;
    return availableDestinations.find((item) => item.id === id);
  }

  getDestinationsByName(name) {
    const availableDestinations = this.destinations;
    return availableDestinations.find((item) => item.name === name);
  }
}

export default DestinationsModel;
