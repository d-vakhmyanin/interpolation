import { combineReducers } from 'redux';
import * as reducers from './reducers';

export type RootState = {
  constants: reducers.ConstantsState;
  args: reducers.ArgsState;
  functions: reducers.FunctionsState;
  isInputWrong: reducers.InputWrongnessState;
  isCalculating: reducers.CalculatingState;
};

export type RootAction =
  | reducers.UpdateConstantsAction
  | reducers.CalculateArgsAction
  | reducers.CalculateFunctionsAction
  | reducers.InputWrongnessAction
  | reducers.FunctionVisibilityAction;

export const rootReducer = combineReducers<RootState>({
  constants: reducers.constantsReducer,
  args: reducers.argsReducer,
  functions: reducers.functionsReducer,
  isInputWrong: reducers.inputReducer,
  isCalculating: reducers.calculationStatusReducer
});
