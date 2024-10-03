import { filter } from '../utilites/filter';

function generateFilter(points) {
  return Object.entries(filter).map(
    ([filterType, filterPointEvents]) => ({
      type: filterType,
      count: filterPointEvents(points.points).length,
    }),
  );
}

export { generateFilter };
