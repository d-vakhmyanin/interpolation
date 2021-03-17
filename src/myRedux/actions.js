export const INIT_SESSION = 'INIT_SESSION';
export const UPDATE_CONSTANTS = 'UPDATE_CONSTANTS';
export const CALCULATE_X = 'CALCULATE_X';
export const CALCULATE_FUNCTIONS = 'CALCULATE_FUNCTIONS';
export const SET_CALCULATION_STATUS = 'SET_CALCULATION_STATUS';
export const SET_INPUT_WRONGNESS = 'SET_INPUT_WRONGNESS';
export const TOGGLE_FUNCTION_VISIBILITY = 'TOGGLE_FUNCTION_VISIBILITY';

export const initSession = () => {
  return {
    type: INIT_SESSION
  };
};

export const updateConstants = (greek, area) => {
  return {
    type: UPDATE_CONSTANTS,
    greek,
    area
  };
};

export const calculateX = () => {
  return {
    type: CALCULATE_X
  };
};

export const calculateFunctions = (x) => {
  return {
    type: CALCULATE_FUNCTIONS,
    payload: x
  };
};

export const setCalculationStatus = (isCalculating) => {
  return {
    type: SET_CALCULATION_STATUS,
    payload: isCalculating
  };
};

export const setInputWrongness = (isInputsWrong) => {
  return {
    type: SET_INPUT_WRONGNESS,
    payload: isInputsWrong
  };
};

export const toggleFunctionVisibility = (func) => {
  return {
    type: TOGGLE_FUNCTION_VISIBILITY,
    payload: func
  };
};
