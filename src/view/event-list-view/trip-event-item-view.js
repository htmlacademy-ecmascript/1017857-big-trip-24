import AbstractView from '../../framework/view/abstract-view';
import { humanizeDueDate, timeFromTo } from '../../utilites/utils';
import { DateFormat } from '../../constants';

function createOfferTemplate(offer) {
  return (
    `
      <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>
    `
  );
}

function createTripEventItemTemplate(point, destinationModel, offersModel) {
  const { dateFrom, dateTo, type, destination, basePrice, isFavorite } = point;
  const offers = offersModel.getOffersByType(type);
  const currentDestination = destinationModel.getDestinationsById(destination);

  const pointDay = humanizeDueDate(dateFrom, DateFormat.EVENT_DATE_FORMAT);
  const timeFrom = humanizeDueDate(dateFrom, DateFormat.EVENT_TIME_FORMAT);
  const timeTo = humanizeDueDate(dateTo, DateFormat.EVENT_TIME_FORMAT);
  const createOfferList = offers.offers.map((offer) => createOfferTemplate(offer)).join('');

  return (
    `
      <li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="${dateFrom}">${pointDay}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${currentDestination.name}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${dateFrom}">${timeFrom}</time>
              &mdash;
              <time class="event__end-time" datetime="${dateTo}">${timeTo}</time>
            </p>
            <p class="event__duration">${timeFromTo(dateFrom, dateTo)}</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${createOfferList}
          </ul>
          <button class="event__favorite-btn ${isFavorite && 'event__favorite-btn--active'}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>
    `
  );
}

class TripEventItemView extends AbstractView {
  #point = null;
  #destinationModel = null;
  #offersModel = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;
  constructor(point, destinationModel, offersModel, onEditClick, onFavoriteClick) {
    super();
    this.#point = point;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripEventItemTemplate(this.#point, this.#destinationModel, this.#offersModel);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}

export default TripEventItemView;
