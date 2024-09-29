import AbstractView from '../../framework/view/abstract-view';

function createTripInfo() {
  return ('<section class="trip-main__trip-info  trip-info"></section>');
}

class TripInfoView extends AbstractView {
  get template() {
    return createTripInfo();
  }
}
export default TripInfoView;
