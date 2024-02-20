import {
  SET_VISUALIZATION_DATA,
  RESET_VISUALIZATION_DATA,
  SET_HEAT_MAP_DATA,
} from '../actionTypes';

export const setVisualizationData = (view, office, data, years) => {
  return {
    type: SET_VISUALIZATION_DATA,
    payload: {
      view,
      office,
      data,
      years,
    },
  };
};

export const resetVisualizationData = () => {
  return {
    type: RESET_VISUALIZATION_DATA,
    payload: {},
  };
};

export const setHeatMapData = (view, office, idx, year) => {
  return {
    type: SET_HEAT_MAP_DATA,
    payload: {
      view,
      office,
      idx,
      year,
    },
  };
};
