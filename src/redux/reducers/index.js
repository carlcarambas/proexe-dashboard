import { combineReducers } from '@reduxjs/toolkit';
import recordsReducer from './records';

const rootReducer = combineReducers({
  records: recordsReducer,
});

export default rootReducer;
