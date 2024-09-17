import { createElement } from '../../render.js';

function createTripInfoCost() {
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>`;
}

class TripInfoCostView {
  getTemplate() {
    return createTripInfoCost();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
export default TripInfoCostView;
