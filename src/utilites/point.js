import dayjs from 'dayjs';
import { getDurationEvent } from './utils';

function checkPointIsFuture(point) {
  return point.date_from && dayjs().isBefore(point.date_from, 'day');
}

function checkPointIsPresent(point) {
  return point.date_from && dayjs().isSame(point.date_from, 'day');
}

function checkPointIsPast(point) {
  return point.date_from && dayjs().isAfter(point.date_from, 'day');
}

function getWeightForNullDate(dateA, DateB) {
  if (dateA === null && DateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (DateB === null) {
    return -1;
  }

  return null;
}

function sortPointEventsByTime(pointA, pointB) {
  const weight = getWeightForNullDate(getDurationEvent(pointA.date_from, pointA.date_to), getDurationEvent(pointB.date_from, pointB.date_to));

  return weight ?? getDurationEvent(pointB.date_from, pointB.date_to) - getDurationEvent(pointA.date_from, pointA.date_to);
}

function sortPointEventsByPrice(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.base_price, pointB.base_price);
  return weight ?? pointB.base_price - pointA.base_price;
}

export { checkPointIsFuture, checkPointIsPresent, checkPointIsPast, sortPointEventsByTime, sortPointEventsByPrice };
