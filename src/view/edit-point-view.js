import { capitalizeFirstLetter, formatDate } from '../utilites/utils';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import {getDestinationsByName, getOffersByType} from '../utilites/point';
import he from 'he';

function createPointTypeTemplate(type) {
  return (`
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
    </div>
  `);
}

function createDestinationTemplate(destination) {
  return (`
    <option value="${destination}"></option>
  `);
}

function createOfferTemplate(offer, pointOffers) {
  const isChecked = pointOffers.some((obj) => obj.id === offer.id);

  return (`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${isChecked && 'checked'}>
      <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
  `);
}

function createEditPointTemplate(state) {
  const { pointData, selectedDestination, selectedType, dateFrom, dateTo, availableOffers } = state;
  const { point, allDestinations, offerTypes} = pointData;

  const createTypeList = offerTypes.map((type) => createPointTypeTemplate(type)).join('');
  const createOfferList = availableOffers.offers.map((offer) => createOfferTemplate(offer, point.offers)).join('');
  const destinationList = allDestinations.map((destination) => createDestinationTemplate(destination.name)).join('');

  return (
    `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${selectedType}.png" alt="Event type icon">
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
                ${selectedType}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${selectedDestination.name}"  list="destination-list-1">
              <datalist id="destination-list-1">
                ${destinationList}
              </datalist>

            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${ formatDate(dateFrom, 'YY/MM/DD HH:mm')}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${ formatDate(dateTo, 'YY/MM/DD HH:mm')}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${point.base_price}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </header>
          <section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              <div class="event__available-offers">
                ${createOfferList}
              </div>
            </section>

            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${he.encode(selectedDestination.description)}</p>
            </section>
          </section>
        </form>
      </li>
    `
  );
}

class EditPointView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleRollUpClick = null;
  #handleDeleteClick= null;

  #datepickerFrom = null;
  #datepickerTo = null;

  #allDestinations = null;
  #allOffers = null;

  constructor(point, destination, allOffers, allDestinations, offerTypes, onFormSubmit, onRollUpClick, onDeleteClick) {
    super();
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollUpClick = onRollUpClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#allDestinations = allDestinations
    this.#allOffers = allOffers;
    this._setState(EditPointView.parsePointToState({ point, destination, allOffers, allDestinations, offerTypes }));
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  static parsePointToState(data) {
    const pointData = { ...data };
    const availableOffers = getOffersByType(pointData.point.type, pointData.allOffers);
    const selectedType = pointData.point.type;
    const dateFrom = pointData.point.dateFrom;
    const dateTo = pointData.point.dateTo;
    const selectedDestination = pointData.destination;

    return ({ pointData, selectedType, dateFrom, dateTo, selectedDestination, availableOffers });
  }

  static parseStateToPoint(state) {
    const pointData = { ...state };

    pointData.pointData.point.type = pointData.selectedType;
    pointData.pointData.point.dateFrom = pointData.dateFrom;
    pointData.pointData.point.dateTo = pointData.dateTo;
    pointData.pointData.point.destination = pointData.selectedDestination.id;

    delete pointData.selectedType;
    delete pointData.dateFrom;
    delete pointData.dateTo;
    delete pointData.selectedDestination;
    delete pointData.availableOffers;

    return (pointData.pointData.point);
  }

  reset(point, destination, allOffers, allDestinations, offerTypes) {
    this.updateElement(EditPointView.parsePointToState({ point, destination, allOffers, allDestinations, offerTypes }));
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpClickHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#pointTypeChangeHandler);
    this.element.querySelector('#event-destination-1').addEventListener('change', this.#destinationChangeHandler);
    this.#setDatepicker();
  }

  removeElement() {
    super.removeElement();
    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  #setDatepicker() {
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler
      }
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...commonConfig,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler
      }
    );
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #rollUpClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollUpClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditPointView.parseStateToPoint(this._state));
  }

  #pointTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      this.updateElement({
        availableOffers: getOffersByType(evt.target.value, this.#allOffers),
        selectedType: evt.target.value
      });
    }
  };

  #destinationChangeHandler = (evt) => {
    this.updateElement({
      selectedDestination: getDestinationsByName(evt.target.value, this.#allDestinations)
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };
}

export default EditPointView;
