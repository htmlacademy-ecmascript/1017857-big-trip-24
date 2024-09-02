import TripFilterView from '../view/trip-filter-view';
import { render } from '../render.js';

export default class FilterPresenter {
  tripFilterComponent = new TripFilterView();

  constructor({ filterContainer }) {
    this.filterContainer = filterContainer;
  }

  init() {
    render(this.tripFilterComponent, this.filterContainer);
  }
}
