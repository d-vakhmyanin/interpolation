import { ActionType, createReducer } from 'typesafe-actions';

import * as actions from './actions';
import * as funcs from '../Calculations';

export type UpdateConstantsAction = ActionType<typeof actions>;
export type CalculateArgsAction = ActionType<typeof actions>;
export type CalculateFunctionsAction = ActionType<typeof actions>;
export type InputWrongnessAction = ActionType<typeof actions>;
export type FunctionVisibilityAction = ActionType<typeof actions>;

export type ConstantsState = {
  greek: {
    alpha: number;
    beta: number;
    epsilon: number;
    mu: number;
    delta: number;
  };
  area: {
    A: number;
    B: number;
    C: number;
    D: number;
    n: number;
  };
};

export type ArgsState = {
  x: number[];
  xn: number[];
};

export type FunctionsState = {
  f: {
    values: (number | undefined)[];
    checked: boolean;
  };
  df: {
    values: (number | undefined)[];
    checked: boolean;
  };
  Pn: {
    values: (number | undefined)[];
    checked: boolean;
  };
  dPn: {
    values: (number | undefined)[];
    checked: boolean;
  };
  rn: {
    values: number[];
    checked: boolean;
  };
};

export type InputWrongnessState = boolean;

export type CalculatingState = boolean;

const initialConstantsState: ConstantsState = {
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

const initialArgsState: ArgsState = {
  x: [],
  xn: []
};

const initialFunctionsState: FunctionsState = {
  f: {
    values: [],
    checked: true
  },
  df: {
    values: [],
    checked: false
  },
  Pn: {
    values: [],
    checked: true
  },
  dPn: {
    values: [],
    checked: false
  },
  rn: {
    values: [],
    checked: false
  }
};

const initialWrongnessState: InputWrongnessState = false;

const initialCalculatingState: CalculatingState = false;

export const constantsReducer = createReducer<ConstantsState>(initialConstantsState).handleAction(
  actions.updateConstants,
  (state, { payload }) => ({
    greek: payload.greek,
    area: payload.area
  })
);

export const argsReducer = createReducer<ArgsState>(initialArgsState).handleAction(
  actions.calculateX,
  () => ({
    x: funcs.calculateX(),
    xn: funcs.calculateXn()
  })
);

export const functionsReducer = createReducer<FunctionsState>(initialFunctionsState)
  .handleAction(actions.calculateFunctions, (state, { payload }) => {
    const x = payload.x;
    const f = funcs.calculateFunction(x, funcs.calculate_F);
    const df = funcs.calculateFunction(x, funcs.calculate_dF);
    const Pn = funcs.calculateFunction(x, funcs.calculate_Pn);
    const dPn = funcs.calculateFunction(x, funcs.calculate_dPn);
    const rn = f.map((elem, index) =>
      elem !== undefined && Pn[index] !== undefined ? Math.abs(elem - Pn[index]!) : -1
    );
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
  })
  .handleAction(actions.toggleFunctionVisibility, (state, { payload }) => {
    const func = (state as any)[payload];
    return func
      ? {
          ...state,
          [payload]: { ...func, checked: !func.checked }
        }
      : state;
  });

export const calculationStatusReducer = createReducer<CalculatingState>(
  initialCalculatingState
).handleAction(actions.setCalculationStatus, (state, { payload }) => payload);

export const inputReducer = createReducer<InputWrongnessState>(initialWrongnessState).handleAction(
  actions.setInputWrongness,
  (state, { payload }) => payload
);
