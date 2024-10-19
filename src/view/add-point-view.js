import { capitalizeFirstLetter } from '../utilites/utils';
import AbstractStatefulView from "../framework/view/abstract-stateful-view";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';


function createPointTypeTemplate(type) {
  return (`
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
    </div>
  `);
}

function createOfferTemplate(offer) {
  return (`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage">
      <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
  `);
}

function createDestinationTemplate(destination) {
  return (
    `
      <option value="${destination.name}">${destination.name}</option>
    `
  );
}

function createPhotoTemplate(picture) {
  return (
    `
      <img class="event__photo" src="${picture.src}" alt="${picture.description}">
    `
  );
}

function createAddPointTemplate(point, destinationsModel, offersModel) {
  const { basePrice, dateFrom, dateTo, type, destination, offers } = point;
  const offerTypes = offersModel.getOffersType();
  const availableOffers = offersModel.getOffersByType(type)
  const availableDestinations = destinationsModel.destinations;
  const selectedDestination = destination.name !== '' ? destinationsModel.getDestinationsById(destination) : destination;
  console.log(point)


  const createTypeList = offerTypes.map((offer) => createPointTypeTemplate(offer)).join('');
  const createAvailableOfferList = availableOffers.offers.map((offer) => createOfferTemplate(offer)).join('');
  const createDestinationList = availableDestinations.map((availableDestination) => createDestinationTemplate(availableDestination)).join('');
  const createPictureList = selectedDestination.pictures.map((picture) => createPhotoTemplate(picture)).join('');
  return (
    `
      <li class="trip-events__item">
        <form class="event event--edit" action="https://echo.htmlacademy.ru/courses" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>
                  ${createTypeList}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
                ${type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${selectedDestination.name}" list="destination-list-1">
              <datalist id="destination-list-1">
                 ${createDestinationList}
              </datalist>
            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Cancel</button>
          </header>
          <section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              <div class="event__available-offers">
                ${createAvailableOfferList}
              </div>
            </section>

            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${he.encode(selectedDestination.description)}</p>

              <div class="event__photos-container">
                <div class="event__photos-tape">
                  ${createPictureList}
                </div>
              </div>
            </section>
          </section>
        </form>
      </li>
    `
  );
}

class AddPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleDeleteClick = null; //todo может переименовать на cancel
  #destinationsModel = null;
  #offersModel = null;
  #datepicker = null;

  constructor(point, destinationsModel, offersModel, onFormSubmit, onDeleteClick) {
    super();
    this._setState(AddPointView.parsePointToState(point));
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createAddPointTemplate(this._state, this.#destinationsModel, this.#offersModel);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formCancelClickHandler);

    this.element.querySelector('#event-destination-1').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#priceChangeHandler);

    this.#setDatepicker();
  }

  #setDatepicker() {
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      'time_24hr': true
    };

    this.datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        maxDate: this._state.dateTo,
      });

    this.datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        minDate: this._state.dateFrom,
      });
  }

  #formSubmitHandler = (evt) => {
    console.log(this._state);
    evt.preventDefault();
    this.#handleFormSubmit(AddPointView.parseStateToPoint(this._state));
  };

  #formCancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(AddPointView.parseStateToPoint(this._state));
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const targetDestination = evt.target.value;
    const newDestination = this.#destinationsModel.getDestinationsByName(targetDestination);
    this.updateElement({
      destination: newDestination.id,
    });

  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    const targetType = evt.target.value;
    this.updateElement ({ type: targetType, offers: [] });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    console.log(evt.target.value);
    const newPrice = evt.target.value;
    this._setState({
      base_price: Number(newPrice),
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate
    });
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}

export default AddPointView;
