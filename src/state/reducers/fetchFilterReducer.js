//This reducer is used strictly for allowing the user
//to build up a query string which is sent to the API.
//The response is handled by the dataReducer.
import {
  SET_DATE_FILTER_FORMAT,
  SET_ASYLUM_OFFICE_FILTER,
  SET_CONTINENT_FILTER,
  SET_GEOPOLITICAL_FILTER,
} from '../actionTypes';
import {
  regions,
  officeRegions,
  continentEnum,
  geopoliticalEnum,
} from '../../data/filterConstants';

const initialState = {
  isFiscalYear: false,
  asylumOffice: [],
  region: [],
  continents: [],
  geopolitical: [],
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATE_FILTER_FORMAT: {
      return {
        ...state,
        isFiscalYear: action.payload,
      };
    }
    case SET_ASYLUM_OFFICE_FILTER: {
      return {
        ...state,
        asylumOffice: action.payload,
      };
    }
    case SET_CONTINENT_FILTER: {
      return {
        ...state,
        continents: action.payload,
        region: deriveRegion({ ...state, continents: action.payload }),
      };
    }
    case SET_GEOPOLITICAL_FILTER: {
      return {
        ...state,
        geopolitical: action.payload,
        region: deriveRegion({ ...state, geopolitical: action.payload }),
      };
    }
    default: {
      return state;
    }
  }
};

// As regional filters are added, destructure them into this function and add the appropriate filter step
const deriveRegion = ({ continents, geopolitical }) => {
  const territoryList = {};
  regions.forEach(region => (territoryList[region.territory] = false));

  if (
    continents.length > 0 &&
    continents.length < Object.keys(continentEnum).length
  ) {
    regions.forEach(region => {
      if (continents.includes(region.continent))
        territoryList[region.territory] = true;
    });
  }
  if (
    geopolitical.length > 0 &&
    geopolitical.length < Object.keys(geopoliticalEnum).length
  ) {
    regions.forEach(region => {
      if (geopolitical.includes(region.geopolitical))
        territoryList[region.territory] = true;
    });
  }

  return territoryList;
};

/* This will build the query parameter string to send to the api with all present filter values.
As more filter parameters are added, add onto the query string as specified in the api docs.
When checking whether to build a query for a particular parameter, be sure to check not only if
a selection has been made, but whether all options have been selected (to limit string length).
NOTE - when the from/to query parameters are added, be sure they follow the yyyy-mm-dd string
format that the back end is expecting */
export const buildQueryString = ({ isFiscalYear, asylumOffice, region }) => {
  let query = '?';
  const regionArray = Object.entries(region)
    .filter(territory => territory[1])
    .map(territory => territory[0]);

  if (isFiscalYear) query += 'isFiscalYear=true&';
  if (asylumOffice.length > 0 && asylumOffice.length < officeRegions.length)
    query += `asylumOffice=${asylumOffice.join(',')}&`;
  // Eventually, the regions object should house a key for country code which can be used to build
  // The query parameter string so as to limit the length of the query string (DDOS issues can
  // Potentially come into play if the length is excessive)
  if (regionArray.length > 0) query += `citizenship=${regionArray.join('0')}&`;
  // Use 0 as the delimiter to ease incorporating updates ("," and "-" show up in citizenship records)
  if (query.slice(query.length - 1) === '&')
    query = query.slice(0, query.length - 1);
  return query;
};

export default filterReducer;
