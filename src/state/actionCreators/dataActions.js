import {
  FILTER_SEARCH,
  RESET_CASE_DATA,
  GET_DEFAULT_COMPARISONS,
  GET_FILTERED_DATA,
  GET_MOCK_FILTERED_DATA,
  PERFORM_ADVANCED_SEARCH,
  TOGGLE_ADVANCED_SEARCH,
} from '../actionTypes';

export const filterSearch = filteredCases => {
  return {
    type: FILTER_SEARCH,
    payload: {
      filteredCases,
    },
  };
};

export const resetCaseData = () => {
  return {
    type: RESET_CASE_DATA,
    payload: {},
  };
};

export const getDefaultComparisons = comparisonData => {
  return {
    type: GET_DEFAULT_COMPARISONS,
    payload: {
      comparisonData,
    },
  };
};

export const getFilteredData = cases => {
  return {
    type: GET_FILTERED_DATA,
    payload: {
      cases,
    },
  };
};

export const getMockFilteredData = cases => {
  return {
    type: GET_MOCK_FILTERED_DATA,
    payload: {
      cases,
    },
  };
};

export const performAdvancedSearch = filteredCases => {
  return {
    type: PERFORM_ADVANCED_SEARCH,
    payload: {
      filteredCases,
    },
  };
};

export const toggleAdvancedSearch = displayAdvancedSearch => {
  return {
    type: TOGGLE_ADVANCED_SEARCH,
    payload: {
      displayAdvancedSearch,
    },
  };
};
