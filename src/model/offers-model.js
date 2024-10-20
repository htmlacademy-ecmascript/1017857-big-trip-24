import Observable from '../framework/observable';
import { UpdateType } from '../constants';

class OffersModel extends Observable {
  #pointsApiService = null;
  #offers = [];

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      this.#offers = await this.#pointsApiService.offers;
    } catch (err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
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
