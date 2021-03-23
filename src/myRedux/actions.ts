import { createAction } from 'typesafe-actions';

import { ConstantsState, ArgsState, CalculatingState, InputWrongnessState } from './reducers';

const UPDATE_CONSTANTS = 'UPDATE_CONSTANTS';
const CALCULATE_X = 'CALCULATE_X';
const CALCULATE_FUNCTIONS = 'CALCULATE_FUNCTIONS';
const CALCULATE_X_AND_FUNCTIONS = 'CALCULATE_X_AND_FUNCTIONS';
const SET_CALCULATION_STATUS = 'SET_CALCULATION_STATUS';
const SET_INPUT_WRONGNESS = 'SET_INPUT_WRONGNESS';
const TOGGLE_FUNCTION_VISIBILITY = 'TOGGLE_FUNCTION_VISIBILITY';

export const updateConstants = createAction(UPDATE_CONSTANTS)<ConstantsState>();

export const calculateX = createAction(CALCULATE_X)();

export const calculateFunctions = createAction(CALCULATE_FUNCTIONS)<ArgsState>();

export const calculateXAndFunctions = createAction(CALCULATE_X_AND_FUNCTIONS)();

export const setCalculationStatus = createAction(SET_CALCULATION_STATUS)<CalculatingState>();

export const setInputWrongness = createAction(SET_INPUT_WRONGNESS)<InputWrongnessState>();

export const toggleFunctionVisibility = createAction(TOGGLE_FUNCTION_VISIBILITY)<string>();
