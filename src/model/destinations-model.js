import Observable from '../framework/observable';
import { UpdateType } from '../constants';

class DestinationsModel extends Observable {
  #pointsApiService = null;
  #destinations = [];

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
    //
    // this.#pointsApiService.points.then((points) => {
    //   console.log(points.map(this.#adaptToClient));
    //   // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
    //   // а ещё на сервере используется snake_case, а у нас camelCase.
    //   // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
    //   // Есть вариант получше - паттерн "Адаптер"
    // });
  }

  get destinations() {
    return this.#destinations;
  }

  async init() {
    try {
      this.#destinations = await this.#pointsApiService.destinations;
    } catch (err) {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  }

  getDestinationsById(id) {
    const availableDestinations = this.destinations;
    return availableDestinations.find((item) => item.id === id);
  }

  getDestinationsByName(name) {
    const availableDestinations = this.destinations;
    return availableDestinations.find((item) => item.name === name);
  }

  // #adaptToClient(destination) {
  //   const adaptedDestination = {
  //     ...destination,
  //     // dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
  //     // dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
  //     // basePrice: point['base_price'],
  //     // isFavorite: point['is_favorite'],
  //   };
  //
  //   // delete adaptedPoint['date_from'];
  //   // delete adaptedPoint['date_to'];
  //   // delete adaptedPoint['base_price'];
  //   // delete adaptedPoint['is_favorite'];
  //
  //   return adaptedDestination;
  // }
}

export default DestinationsModel;
