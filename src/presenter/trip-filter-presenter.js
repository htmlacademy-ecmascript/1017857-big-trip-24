import { render } from '../framework/render.js';
import TripFilterView from '../view/trip-filter-view';

class TripFilterPresenter {
  #tripFilterContainer = null;
  // #tripFilterViewComponent = new TripFilterView();
  #filters = null;

  constructor(tripFilterContainer, filters) {
    this.#tripFilterContainer = tripFilterContainer;
    this.#filters = filters;
  }

  init() {
    render(new TripFilterView(this.#filters), this.#tripFilterContainer);
  }
}

export default TripFilterPresenter;
