import dayjs from 'dayjs';
import { getDurationEvent } from './utils';

function checkPointIsFuture(point) {
  return point.dateFrom && dayjs().isBefore(point.dateFrom, 'day');
}

function checkPointIsPresent(point) {
  return point.dateFrom && dayjs().isSame(point.dateFrom, 'day');
}

function checkPointIsPast(point) {
  return point.dateFrom && dayjs().isAfter(point.dateFrom, 'day');
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
  const weight = getWeightForNullDate(getDurationEvent(pointA.dateFrom, pointA.dateTo), getDurationEvent(pointB.dateFrom, pointB.dateTo));

  return weight ?? getDurationEvent(pointB.dateFrom, pointB.dateTo) - getDurationEvent(pointA.dateFrom, pointA.dateTo);
}

function sortPointEventsByPrice(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.basePrice, pointB.basePrice);
  return weight ?? pointB.basePrice - pointA.basePrice;
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

export { checkPointIsFuture, checkPointIsPresent, checkPointIsPast, sortPointEventsByTime, sortPointEventsByPrice, isDatesEqual };
