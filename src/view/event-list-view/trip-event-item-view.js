import AbstractView from '../../framework/view/abstract-view';
import { humanizeDueDate, timeFromTo } from '../../utilites/utils';
import { DATE_FORMAT } from '../../constants';

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

function createTripEventItemTemplate(point, destination, offers) {
  const pointDay = humanizeDueDate(point.dateFrom, DATE_FORMAT.EVENT_DATE_FORMAT);
  const timeFrom = humanizeDueDate(point.dateFrom, DATE_FORMAT.EVENT_TIME_FORMAT);
  const timeTo = humanizeDueDate(point.dateTo, DATE_FORMAT.EVENT_TIME_FORMAT);
  const createOfferList = offers.map((offer) => createOfferTemplate(offer)).join('');

  return (
    `
      <li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="2019-03-18">${pointDay}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${destination.name}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${point.dateFrom}">${timeFrom}</time>
              &mdash;
              <time class="event__end-time" datetime="${point.dateTo}">${timeTo}</time>
            </p>
            <p class="event__duration">${timeFromTo(point.dateFrom, point.dateTo)}</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${point.base_price}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${createOfferList}
          </ul>
          <button class="event__favorite-btn ${point.is_favorite && 'event__favorite-btn--active'}" type="button">
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
  #pointModel = null;
  #destinationModel = null;
  #offersModel = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;
  constructor(pointModel, destinationModel, offersModel, onEditClick, onFavoriteClick) {
    super();
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;
    this.#offersModel = offersModel;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripEventItemTemplate(this.#pointModel, this.#destinationModel.getDestinationsById(this.#pointModel.destination), this.#offersModel.getOffersById(this.#pointModel.type, this.#pointModel.offers));
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
