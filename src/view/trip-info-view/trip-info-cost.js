import AbstractView from '../../framework/view/abstract-view';

function createTripInfoCost() {
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>`;
}

export default class TripInfoCostView extends AbstractView {
  get template() {
    return createTripInfoCost();
  }
}
