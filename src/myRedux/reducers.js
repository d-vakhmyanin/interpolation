import * as actions from './actions';
import * as funcs from '../Calculations';

export const constantsReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.INIT_SESSION:
      return {
        greek: {
          alpha: 1,
          beta: 1,
          epsilon: 1,
          mu: 1,
          delta: 1
        },
        area: {
          A: -10,
          B: 10,
          C: -1,
          D: 1
        }
      };
    case actions.UPDATE_CONSTANTS:
      return {
        greek: action.greek,
        area: action.area
      };
    default:
      return state;
  }
};

export const argsReducer = (state = {}, action) => {
  if (action.type === actions.CALCULATE_X) {
    const x = funcs.calculateX();
    const xn = funcs.calculateXn();

    return {
      x,
      xn
    };
  }
  return state;
};

export const calculationStatusReducer = (state = false, action) => {
  if (action.type === actions.SET_CALCULATION_STATUS) {
    return action.payload;
  }
  return state;
};

export const functionsReducer = (state = {}, action) => {
  if (action.type === actions.CALCULATE_FUNCTIONS) {
    const x = action.payload;
    const f = funcs.calculateFunction(x, funcs.calculate_F);
    const df = funcs.calculateFunction(x, funcs.calculate_dF);
    const Pn = funcs.calculateFunction(x, funcs.calculate_Pn);
    const dPn = funcs.calculateFunction(x, funcs.calculate_dPn);
    const rn = f.map((elem, index) => Math.abs(Pn[index] - elem));

    return {
      f: {
        values: f,
        checked: true
      },
      df: {
        values: df,
        checked: false
      },
      Pn: {
        values: Pn,
        checked: true
      },
      dPn: {
        values: dPn,
        checked: false
      },
      rn: {
        values: rn,
        checked: false
      }
    };
  }

  if (action.type === actions.TOGGLE_FUNCTION_VISIBILITY) {
    return {
      ...state.functions,
      [action.payload]: {
        ...state.functions[action.payload],
        checked: !state.functions[action.payload].checked
      }
    };
  }

  return state;
};

export const inputReducer = (state = false, action) => {
  if (action.type === actions.SET_INPUT_WRONGNESS) {
    return action.payload;
  }
  return state;
};
