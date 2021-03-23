import { createSelector } from 'reselect';
import { store } from '../index';

export const getConstants = (state: RootState) => state.constants;

export const getArgs = (state: RootState) => state.args;

export const getFunctions = (state: RootState) => state.functions;

export const getFunctionsChecked = createSelector(getFunctions, (functions) => ({
  f: functions.f.checked,
  df: functions.df.checked,
  Pn: functions.Pn.checked,
  dPn: functions.dPn.checked,
  rn: functions.rn.checked
}));

export const getIsInputWrong = (state: RootState) => state.isInputWrong;

export const getIsCalculating = (state: RootState) => state.isCalculating;

export const getXsAndFunctions = createSelector(getConstants, () => {
  const { args, functions } = store.getState();
  return { args, functions };
});

const getRn = (state: RootState) => state.functions.rn;

export const getMaxRn = createSelector(getRn, (rn) => Math.max(...rn.values));

export const getMaxRnIndex = createSelector(getRn, getMaxRn, (rn, max) => rn.values.indexOf(max));
