import {
  SET_DATE_FILTER_FORMAT,
  SET_ASYLUM_OFFICE_FILTER,
  SET_CONTINENT_FILTER,
  SET_GEOPOLITICAL_FILTER,
} from '../actionTypes';

export const setDateFilterFormat = isFiscalYear => {
  return {
    type: SET_DATE_FILTER_FORMAT,
    payload: {
      isFiscalYear,
    },
  };
};

export const setAsylumOfficeFilter = asylumOffice => {
  return {
    type: SET_ASYLUM_OFFICE_FILTER,
    payload: {
      asylumOffice,
    },
  };
};

export const setContinentFilter = continents => {
  return {
    type: SET_CONTINENT_FILTER,
    payload: {
      continents,
    },
  };
};

export const setGeopoliticalFilter = geopolitical => {
  return {
    type: SET_GEOPOLITICAL_FILTER,
    payload: {
      geopolitical,
    },
  };
};
