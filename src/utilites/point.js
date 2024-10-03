import dayjs from 'dayjs';

function checkPointIsFuture(point) {
  return point.date_from && dayjs().isBefore(point.date_from, 'day');
}

function checkPointIsPresent(point) {
  return point.date_from && dayjs().isSame(point.date_from, 'day');
}

function checkPointIsPast(point) {
  return point.date_from && dayjs().isAfter(point.date_from, 'day');
}

export { checkPointIsFuture, checkPointIsPresent, checkPointIsPast };
