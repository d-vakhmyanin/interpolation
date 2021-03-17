import { combineReducers } from 'redux';
import * as reducers from './reducers';

export const rootReducer = combineReducers({
  constants: reducers.constantsReducer,
  args: reducers.argsReducer,
  functions: reducers.functionsReducer,
  isInputWrong: reducers.inputReducer,
  isCalculating: reducers.calculationStatusReducer
});
