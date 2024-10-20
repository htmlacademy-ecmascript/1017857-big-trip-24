import { remove, render, replace } from '../framework/render.js';
import TripFilterView from '../view/trip-filter-view';
import { FilterType, UpdateType } from '../constants';
import { filter } from '../utilites/filter';

class TripFilterPresenter {
  #tripFilterContainer = null;
  #filtersModel = null;
  #pointsModel = null;

  #tripFilterComponent = null;

  constructor(tripFilterContainer, filtersModel, pointsModel) {
    this.#tripFilterContainer = tripFilterContainer;
    this.#filtersModel = filtersModel;
    this.#pointsModel = pointsModel;

    this.#filtersModel.addObserver(this.#handleModelEvent);
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const tasks = this.#pointsModel.points;
    return Object.values(FilterType).map((type) => ({
      type,
      count: filter[type](tasks).length
    }));
  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#tripFilterComponent;

    this.#tripFilterComponent = new TripFilterView(
      filters,
      this.#filtersModel.filter,
      this.#handleFilterTypeChange
    );

    if (prevFilterComponent === null) {
      render(this.#tripFilterComponent, this.#tripFilterContainer);
      return;
    }

    replace(this.#tripFilterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }
    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };
}

export default TripFilterPresenter;
