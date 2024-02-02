import { combineReducers } from 'redux';
import vizReducer from './vizReducer';
import filterReducer from './fetchFilterReducer';
import dataReducer from './dataReducer';

export default combineReducers({
  vizReducer,
  filterReducer,
  dataReducer,
});
