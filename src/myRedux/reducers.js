import * as actions from './actions';
import * as funcs from '../Calculations';

const initialConstantsState = {
  greek: {
    alpha: 1,
    beta: 1,
    epsilon: 1,
    mu: 1,
    delta: 0.01
  },
  area: {
    A: -10,
    B: 10,
    C: -1,
    D: 1,
    n: 1
  }
};
export const constantsReducer = (state = initialConstantsState, action) => {
  if (action.type === actions.UPDATE_CONSTANTS) {
    return {
      greek: action.greek,
      area: action.area
    };
  }
  return state;
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
  switch (action.type) {
    case actions.CALCULATE_FUNCTIONS:
      const x = action.payload;
      const f = funcs.calculateFunction(x, funcs.calculate_F);
      const df = funcs.calculateFunction(x, funcs.calculate_dF);
      const Pn = funcs.calculateFunction(x, funcs.calculate_Pn);
      const dPn = funcs.calculateFunction(x, funcs.calculate_dPn);
      const rn = f.map((elem, index) => Math.abs(Pn[index] - elem));

      if (state.f === undefined) {
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
      } else {
        return {
          f: {
            values: f,
            checked: state.f.checked
          },
          df: {
            values: df,
            checked: state.df.checked
          },
          Pn: {
            values: Pn,
            checked: state.Pn.checked
          },
          dPn: {
            values: dPn,
            checked: state.dPn.checked
          },
          rn: {
            values: rn,
            checked: state.rn.checked
          }
        };
      }
    case actions.TOGGLE_FUNCTION_VISIBILITY:
      if (state[action.payload] !== undefined)
        return {
          ...state,
          [action.payload]: { ...state[action.payload], checked: !state[action.payload].checked }
        };
    case actions.CALCULATE_F_IN_XN:
      const fn = funcs.calculateFunction(action.payload, funcs.calculate_F);
      return {
        ...state,
        fn
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
