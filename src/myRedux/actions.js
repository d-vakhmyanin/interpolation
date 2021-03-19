export const UPDATE_CONSTANTS = 'UPDATE_CONSTANTS';
export const CALCULATE_X = 'CALCULATE_X';
export const CALCULATE_FUNCTIONS = 'CALCULATE_FUNCTIONS';
export const CALCULATE_F_IN_XN = 'CALCULATE_F_IN_XN';
export const SET_CALCULATION_STATUS = 'SET_CALCULATION_STATUS';
export const SET_INPUT_WRONGNESS = 'SET_INPUT_WRONGNESS';
export const TOGGLE_FUNCTION_VISIBILITY = 'TOGGLE_FUNCTION_VISIBILITY';

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

export const calculateXAndFunctions = () => {
  return (dispatch, getState) => {
    dispatch({
      type: CALCULATE_X
    });
    const { args } = getState();
    dispatch({
      type: CALCULATE_FUNCTIONS,
      payload: args.x
    });
    // dispatch({
    //   type: CALCULATE_F_IN_XN,
    //   payload: args.xn
    // });
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
