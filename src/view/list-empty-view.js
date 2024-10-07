import AbstractView from '../framework/view/abstract-view';

function createListEmptyTemplate() {
  return `
      <p class="trip-events__msg">Click New Event to create your first point</p>
  `;
}

class ListEmptyView extends AbstractView {
  get template() {
    return createListEmptyTemplate();
  }
}

export default ListEmptyView;
