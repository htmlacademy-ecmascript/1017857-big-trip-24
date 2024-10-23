import AbstractView from '../framework/view/abstract-view';
import { SortingType } from '../constants';

function createTripSortTemplate(currentSortingType) {
  return (
    `
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <div class="trip-sort__item  trip-sort__item--${SortingType.DAY}">
          <input id="sort-${SortingType.DAY}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortingType.DAY}" ${currentSortingType === SortingType.DAY ? 'checked' : ''}>
          <label class="trip-sort__btn" for="sort-${SortingType.DAY}" data-sort-type="${SortingType.DAY}">Day</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--${SortingType.EVENT}">
          <input id="sort-${SortingType.EVENT}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortingType.EVENT}" ${currentSortingType === SortingType.EVENT ? 'checked' : ''}>
          <label class="trip-sort__btn" for="sort-${SortingType.EVENT}" data-sort-type="${SortingType.EVENT}">Event</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--${SortingType.TIME}">
          <input id="sort-${SortingType.TIME}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortingType.TIME}" ${currentSortingType === SortingType.TIME ? 'checked' : ''}>
          <label class="trip-sort__btn" for="sort-${SortingType.TIME}" data-sort-type="${SortingType.TIME}">Time</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--${SortingType.PRICE}">
          <input id="sort-${SortingType.PRICE}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortingType.PRICE}" ${currentSortingType === SortingType.PRICE ? 'checked' : ''}>
          <label class="trip-sort__btn" for="sort-${SortingType.PRICE}" data-sort-type="${SortingType.PRICE}">Price</label>
        </div>

        <div class="trip-sort__item  trip-sort__item--${SortingType.OFFERS}">
          <input id="sort-${SortingType.OFFERS}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortingType.OFFERS}" ${currentSortingType === SortingType.OFFERS ? 'checked' : ''}>
          <label class="trip-sort__btn" for="sort-${SortingType.OFFERS}" data-sort-type="${SortingType.OFFERS}">Offers</label>
        </div>
      </form>
    `
  );
}

class TripSortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;
  constructor(currentSortType, onSortTypeChange) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeClickHandler);
  }

  get template() {
    return createTripSortTemplate(this.#currentSortType);
  }

  #sortTypeClickHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    evt.preventDefault();

    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}

export default TripSortView;
