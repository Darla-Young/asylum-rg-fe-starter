import {
  SET_VISUALIZATION_DATA,
  SET_HEAT_MAP_DATA,
  RESET_VISUALIZATION_DATA,
} from '../actionTypes';

const currentYear = new Date().getFullYear();
export const initialState = {
  view: 'time-series',
  office: {
    location: 'All Offices',
    timeSeriesData: {},
    timeSeriesYears: [2015, currentYear],
    citizenshipMapData: {},
    citizenshipMapYears: [2015, currentYear],
    officeHeatMapData: {},
    officeHeatMapYears: [2015, currentYear],
  },
};

const vizReducer = (state = initialState, action) => {
  let dataKey, yearKey, office;

  if (!action.payload) office = 'All Offices';
  else office = action.payload.office;

  switch (action.type) {
    case RESET_VISUALIZATION_DATA:
      return initialState;

    case SET_VISUALIZATION_DATA:
      switch (action.payload.view) {
        case 'time-series':
          dataKey = 'timeSeriesData';
          yearKey = 'timeSeriesYears';
          break;
        case 'office-heat-map':
          dataKey = 'officeHeatMapData';
          break;
        case 'citizenship':
          dataKey = 'citizenshipMapData';
          break;
        default:
          break;
      }
      return {
        ...state,
        view: action.payload.view,
        office: {
          ...state.office,
          location: office,
          [dataKey]: action.payload.data,
          [yearKey]: action.payload.years,
        },
      };

    case SET_HEAT_MAP_DATA:
      switch (action.payload.view) {
        case 'time-series':
          dataKey = 'timeSeriesYears';
          break;
        case 'citizenship':
          dataKey = 'citizenshipMapYears';
          break;
        default:
          dataKey = 'timeSeriesYears';
          break;
      }
      return {
        ...state,
        view: 'office-heat-map',
        office: {
          ...state.office,
          location: 'All Offices',
          [dataKey]:
            action.payload.idx === 0
              ? [state.office[dataKey][1], action.payload.year]
              : [state.office[dataKey][0], action.payload.year],
        },
      };

    default:
      return state;
  }
};

export default vizReducer;
