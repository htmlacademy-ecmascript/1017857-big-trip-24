import AbstractView from '../framework/view/abstract-view';

function createFilterItemTemplate(filter, isChecked) {
  const { type, count } = filter;

  return (
    `
      <div class="trip-filters__filter">
        <input
          id="filter-${type}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          ${isChecked ? 'checked' : ''}
          ${count === 0 && 'disabled'}
        />
        <label
          class="trip-filters__filter-label"
          for="filter-${type}"
        >
          ${filter.type}
        </label>
      </div>
    `
  );
}

function createTripFilterTemplate(filters) {
  const createFilterList = filters.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');
  return (
    `
      <form class="trip-filters" action="#" method="get">
        ${createFilterList}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    `
  );
}

class TripFilterView extends AbstractView {
  #filters = null;
  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createTripFilterTemplate(this.#filters);
  }
}

export default TripFilterView;
