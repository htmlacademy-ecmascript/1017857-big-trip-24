import Observable from '../framework/observable';
import { getOffersData } from '../mock/offers-data';

class OffersModel extends Observable{
  #offers = getOffersData();

  get offers() {
    return this.#offers;
  }

  getOffersType() {
    const availableOffers = this.offers;
    const arrayTypeOffers = [];
    for (let i = 0; i < availableOffers.length; i++) {
      arrayTypeOffers.push(availableOffers[i].type);
    }
    return arrayTypeOffers;
  }

  getOffersByType(type) {
    const availableOffers = this.offers;
    return availableOffers.find((item) => item.type === type);
  }

  getOffersById(type, offers) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((offer) => offers.find((id) => offer.id === id));
  }
}

export default OffersModel;
