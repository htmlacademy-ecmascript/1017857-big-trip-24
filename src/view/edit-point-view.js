import { capitalizeFirstLetter, formatDate } from '../utilites/utils';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
  const pointEvent = state.point;
  const destinations = state.destinations;
  const currentDestination = state.currentDestination;
  const offerTypes = state.offerTypes;
  const availableOffers = state.availableOffers;
  const pointOffers = state.pointOffers;
  pointEvent.type = state.selectedType;
  pointEvent.dateFrom = state.dateFrom;
  pointEvent.dateTo = state.dateTo;

  const createTypeList = offerTypes.map((type) => createPointTypeTemplate(type)).join('');
  const createOfferList = availableOffers.offers.map((offer) => createOfferTemplate(offer, pointOffers)).join('');
  const destinationList = destinations.map((destination) => createDestinationTemplate(destination.name)).join('');

  return (
    `
      <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img class="event__type-icon" width="17" height="17" src="img/icons/${pointEvent.type}.png" alt="Event type icon">
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
                ${pointEvent.type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination.name}"  list="destination-list-1">
              <datalist id="destination-list-1">
                ${destinationList}
              </datalist>

            </div>

            <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${ formatDate(pointEvent.dateFrom, 'YY/MM/DD HH:mm')}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${ formatDate(pointEvent.dateTo, 'YY/MM/DD HH:mm')}">
            </div>

            <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${pointEvent.base_price}">
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
              <p class="event__destination-description">${currentDestination.description}</p>
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
  #offersModel = null;
  #destinationModel = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor(pointModel, destinationModel, offersModel, onFormSubmit, onRollUpClick) {
    super();
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollUpClick = onRollUpClick;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
    this._setState(EditPointView.parsePointToState(pointModel, destinationModel, offersModel));
    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state);
  }

  static parsePointToState(pointModel, destinationModel, offersModel) {
    const point = { ...pointModel };
    const destinations = destinationModel.destinations;
    const availableOffers = offersModel.getOffersByType(point.type);
    const offerTypes = offersModel.getOffersType();
    const pointOffers = offersModel.getOffersById(point.type, point.offers);
    const currentDestination = destinationModel.getDestinationsById(point.destination);
    const selectedType = point.type;
    const dateFrom = point.dateFrom;
    const dateTo = point.dateTo;
    return ({ point, destinations, availableOffers, offerTypes, pointOffers, currentDestination, selectedType, dateFrom, dateTo });
  }

  static parseStateToPoint(state) {
    const point = { ...state };
    point.point.type = point.selectedType;
    point.point.destination = point.currentDestination.id;
    point.point.dateFrom = point.dateFrom;
    point.point.dateTo = point.dateTo;

    delete point.selectedType;
    delete point.availableOffers;
    delete point.currentDestination;
    delete point.offerTypes;
    delete point.pointOffers;
    delete point.destinations;
    delete point.type;
    delete point.destination;
    delete point.dateFrom;
    delete point.dateTo;

    return (point.point);
  }

  reset(pointModel, destinationModel, offersModel) {
    this.updateElement(EditPointView.parsePointToState(pointModel, destinationModel, offersModel));
  }

  _restoreHandlers() {
    this.element.querySelector('.event--edit').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollUpClickHandler);
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
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.point.dateFrom,
        onChange: this.#dateFromChangeHandler
      }
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.point.dateTo,
        minDate: this._state.point.dateFrom,
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

  #pointTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      this.updateElement({
        availableOffers: this.#offersModel.getOffersByType(evt.target.value),
        selectedType: evt.target.value
      });
    }
  };

  #destinationChangeHandler = (evt) => {
    this.updateElement({
      currentDestination: this.#destinationModel.getDestinationsByName(evt.target.value)
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
