import TripSortView from '../view/trip-sort-view';
import TripEditView from '../view/trip-edit-view';
import TripEventListView from '../view/trip-event-list-view';
import TripEventItemView from '../view/trip-event-item-view';
import { render } from '../render.js';


export default class ContentPresenter {
  sortComponent = new TripSortView();
  editComponent = new TripEditView();
  tripListComponent = new TripEventListView();

  constructor({ contentContainer }) {
    this.contentContainer = contentContainer;
  }

  init() {
    render(this.sortComponent, this.contentContainer);
    render(this.editComponent, this.tripListComponent.getElement());
    render(this.tripListComponent, this.contentContainer);

    for (let i = 0; i < 3; i++) {
      render(new TripEventItemView(), this.tripListComponent.getElement());
    }
  }
}
