import TripSortView from '../view/trip-sort-view';
import EditPointView from '../view/edit-point-view';
import TripEventListView from '../view/event-list-view/trip-event-list-view';
import TripEventItemView from '../view/event-list-view/trip-event-item-view';
import { render } from '../render.js';
import AddPointView from '../view/add-point-view';

export default class ContentPresenter {
  sortComponent = new TripSortView();
  tripListComponent = new TripEventListView();

  constructor(contentContainer, pointsModel, offersModel, destinationsModel) {
    this.contentContainer = contentContainer;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    const currentPoint = this.pointsModel.getPointById(this.pointsModel.points[0].id);
    const currentDestination = this.destinationsModel.getDestinationsById(currentPoint.destination);
    const offerTypes = this.offersModel.getOffersType();
    const availableOffers = this.offersModel.getOffersByType(currentPoint.type);
    const availableDestinations = this.destinationsModel.getDestinations();
    const pointOffers = this.offersModel.getOffersById(currentPoint.type, currentPoint.offers);

    render(this.sortComponent, this.contentContainer);
    render(new AddPointView(currentPoint, availableOffers, currentDestination, offerTypes, pointOffers, availableDestinations), this.tripListComponent.getElement());
    render(new EditPointView(currentPoint, availableOffers, currentDestination, offerTypes, pointOffers), this.tripListComponent.getElement());
    render(this.tripListComponent, this.contentContainer);

    for (let i = 0; i < this.pointsModel.points.length; i++) {
      render(new TripEventItemView(this.pointsModel.points[i], this.destinationsModel.getDestinationsById(this.pointsModel.points[i].destination), this.offersModel.getOffersById(this.pointsModel.points[i].type, this.pointsModel.points[i].offers)), this.tripListComponent.getElement());
    }
  }
}
