import Observable from '../framework/observable';
import { getDestinationsData } from '../mock/destinations-data';

class DestinationsModel extends Observable{
  #destinations = getDestinationsData();

  get destinations() {
    return this.#destinations;
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
