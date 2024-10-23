import dayjs from 'dayjs';
import { HOURS, MINUTES } from '../constants';

function formatDate(date, format) {
  return dayjs(date).format(format);
}

function getDurationEvent(dateFrom, dateTo) {
  return dayjs(dateTo).diff(dateFrom, 'minutes');
}

function timeFromTo(dateFrom, dateTo) {
  const time = dayjs(dateTo).diff(dateFrom, 'minutes');
  const days = Math.trunc(time / (MINUTES * HOURS));
  const hours = Math.trunc(time / MINUTES);
  const minutes = time % MINUTES;
  const daysString = days ? `${days}D ` : '';
  const hoursString = hours ? `${hours}H ` : '';
  const minutesString = minutes ? `${minutes}M` : '';

  return `${daysString}${hoursString}${minutesString}`;
}

function humanizeDueDate(dueDate, dateFormat) {
  return (dueDate && dateFormat ? dayjs(dueDate).format(dateFormat) : '');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const sortByDay = (eventA, eventB) => dayjs(eventA.dateFrom) - dayjs(eventB.dateFrom);

const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { formatDate, timeFromTo, humanizeDueDate, capitalizeFirstLetter, getDurationEvent, isEscKey, sortByDay };
