import { getDestinationsData } from '../mock/destinations-data';

class DestinationsModel {
  #destinations = getDestinationsData();

  get destinations() {
    return this.#destinations;
  }

  getDestinationsById(id) {
    const availableDestinations = this.destinations;
    return availableDestinations.find((item) => item.id === id);
  }
}

export default DestinationsModel;
