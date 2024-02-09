import {
  SET_VISUALIZATION_DATA,
  SET_HEAT_MAP_YEARS,
  RESET_VISUALIZATION_QUERY,
} from '../actionTypes';

/*
      ------------------------------------------------------

      NOTE ON ALL THE SWITCH STATEMENTS:

          Technically, for queries that don't have
        to do with citizenship, we COULD set the data
        in state for ALL the non-citizenship views between 
        those years, since we get all the necessary data 
        anyway, but I think it's more intuitive and 
        convenient for the UI to be able to remember a 
        DIFFERENT user query for each individual view. 
        That way if, say, a researcher wants to see all
        the data by office just from 2017, and then they
        tab over to view all the data as a time series from
        2015-currentYear, and then they go back to the Office tab,
        their previous query won't be overwritten by the
        one they made in the different tab, and they'll
        be able to seamlessly resume.

            -- Labs Staff

      ------------------------------------------------------
*/
const currentYear = new Date().getFullYear();
const officeData = {
  timeSeriesData: {},
  timeSeriesYears: [2015, currentYear],
  citizenshipMapData: {},
  citizenshipMapYears: [2015, currentYear],
};
export const initialState = {
  view: 'time-series',
  currentOffice: 'All Offices',
  offices: {
    'All Offices': {
      ...officeData,
      officeHeatMapData: {},
      officeHeatMapYears: [2015, currentYear],
    },
    'Los Angeles, CA': { ...officeData },
    'San Francisco, CA': { ...officeData },
    'New York, NY': { ...officeData },
    'Houston, TX': { ...officeData },
    'Chicago, IL': { ...officeData },
    'Newark, NJ': { ...officeData },
    'Arlington, VA': { ...officeData },
    'Boston, MA': { ...officeData },
    'Miami, FL': { ...officeData },
    'New Orleans, LA': { ...officeData },
  },
};

const vizReducer = (state = initialState, action) => {
  let dataKey, yearKey, office;

  if (!action.payload) office = 'All Offices';
  else office = action.payload.office;

  switch (action.type) {
    case RESET_VISUALIZATION_QUERY:
      switch (action.payload.view) {
        case 'time-series':
          dataKey = 'timeSeriesData';
          yearKey = 'timeSeriesYears';
          break;
        case 'office-heat-map':
          dataKey = 'officeHeatMapData';
          yearKey = 'officeHeatMapYears';
          break;
        case 'citizenship':
          dataKey = 'citizenshipMapData';
          yearKey = 'citizenshipMapYears';
          break;
        default:
          break;
      }
      return {
        ...state,
        view: action.payload.view,
        currentOffice: 'All Offices',
        offices: {
          ...state.offices,
          [office]: {
            ...state.offices[office],
            [dataKey]: {},
            [yearKey]: [2015, currentYear],
          },
        },
      };

    case SET_VISUALIZATION_DATA:
      switch (action.payload.view) {
        case 'time-series':
          dataKey = 'timeSeriesData';
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
        currentOffice: office,
        offices: {
          ...state.offices,
          [office]: {
            ...state.offices[office],
            [dataKey]: action.payload.data,
          },
        },
      };

    case SET_HEAT_MAP_YEARS:
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
        currentOffice: 'All Offices',
        offices: {
          ...state.offices,
          'All Offices': {
            ...state.offices['All Offices'],
            [dataKey]:
              action.payload.idx === 0 // what is this?
                ? [
                    state.offices['All Offices'][dataKey][1],
                    action.payload.year,
                  ]
                : [
                    state.offices['All Offices'][dataKey][0],
                    action.payload.year,
                  ],
          },
        },
      };

    default:
      return state;
  }
};

export default vizReducer;
