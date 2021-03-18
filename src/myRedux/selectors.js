export const getConstants = (state) => state.constants;
export const getArgs = (state) => state.args;
export const getFunctions = (state) => state.functions;
export const getIsInputWrong = (state) => state.isInputWrong;
export const isCalculating = (state) => state.isCalculating;
export const getMaxRn = (state) =>
  state.functions.rn === undefined ? undefined : Math.max(...state.functions?.rn?.values);
// Math.max(...state.functions?.rn?.values)}
export const getMaxRnIndex = (state) => {
  const max = getMaxRn(state);
  return max === undefined ? undefined : state.args.x[state.functions.rn.values.indexOf(max)];
};
