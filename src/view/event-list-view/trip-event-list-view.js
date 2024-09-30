import AbstractView from '../../framework/view/abstract-view';

function createTripEventListTemplate() {
  return (
    `
      <ul class="trip-events__list"></ul>
    `
  );
}

class TripEventListView extends AbstractView {
  get template() {
    return createTripEventListTemplate();
  }
}

export default TripEventListView;
