const POINTS_COUNT = 5;

const DATE_FORMAT = {
  EVENT_TIME_FORMAT: 'HH:mm',
  EVENT_DATE_FORMAT: 'MMM DD',
  EVENT_DATE_ATTRIBUTE_FORMAT: 'YYYY-MM-DD',
  EVENT_DATETIME_ATTRIBUTE_FORMAT: 'YYYY-MM-DDTHH:mm',
  MAIN_EVENT_DATE_START_FORMAT: 'DD',
  MAIN_EVENT_DATE_END_FORMAT: 'DD MMM',
  INPUT_DATE_FORMAT: 'DD/MM/YY HH:mm',
};

const SortingType = {
  DEFAULT: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

// const EnabledSortingTypes = [SortingType.DAY, SortingType.TIME, SortingType.PRICE];

const HOURS = 24;
const MINUTES = 60;

export { POINTS_COUNT, DATE_FORMAT, HOURS, MINUTES, SortingType, FilterType };
