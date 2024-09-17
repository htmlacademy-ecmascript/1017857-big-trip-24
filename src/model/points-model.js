import { POINTS_COUNT } from '../constants.js';
import { getRandomPointData } from '../mock/points-data';


class PointsModel {
  points = Array.from({ length: POINTS_COUNT }, getRandomPointData);

  getPoints() {
    return this.points;
  }

  getPointById(id) {
    return this.points.find((point) => point.id === id);
  }
}

export default PointsModel;
