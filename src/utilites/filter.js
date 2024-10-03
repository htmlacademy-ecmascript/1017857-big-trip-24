import { FilterType } from '../constants';
import { checkPointIsFuture, checkPointIsPast, checkPointIsPresent } from './point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => checkPointIsFuture(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => checkPointIsPresent(point)),
  [FilterType.PAST]: (points) => points.filter((point) => checkPointIsPast(point)),
};

export { filter };
