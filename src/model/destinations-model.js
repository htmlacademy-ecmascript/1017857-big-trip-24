import { getDestinationsData } from '../mock/destinations-data';

class DestinationsModel {
  destinations = getDestinationsData();

  getDestinations() {
    return this.destinations;
  }

  getDestinationsById(id) {
    const availableDestinations = this.getDestinations();
    return availableDestinations.find((item) => item.id === id);
  }
}

export default DestinationsModel;
