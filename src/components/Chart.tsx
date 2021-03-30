import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
  ReferenceLine
} from 'recharts';

import { ArgsState, ConstantsState, FunctionsState } from '../myRedux/reducers';
import * as selectors from '../myRedux/selectors';
import * as colors from './colors';

type ChartData = {
  x: number;
  xn: number | undefined;
  f: number | undefined;
  df: number | undefined;
  Pn: number | undefined;
  dPn: number | undefined;
  rn: number | undefined;
};

let values: ChartData[];

const approximation = 100000;

const reduce = (val: number | undefined): number | undefined => {
  if (val === undefined) return undefined;
  if (val > approximation) return approximation;
  if (val < -approximation) return -approximation;
  return val;
};

const recalculateValues = (
  args: ArgsState,
  functions: FunctionsState,
  constants: ConstantsState,
  arr: ChartData[]
) => {
  let tmp;
  args.x.map((elem, index) => {
    tmp = args.xn.find((xn) => Math.abs(xn - elem) < constants.greek.delta);
    let PVal = reduce(functions.Pn.values[index]);
    let dPVal = reduce(functions.dPn.values[index]);
    let rnVal = reduce(functions.rn.values[index]);
    return arr.push({
      x: elem === 0 ? 0 : Number.parseFloat(elem.toFixed(3)),
      xn: tmp ? 0 : undefined,
      f: functions.f.values[index],
      df: functions.df.values[index],
      Pn: PVal,
      dPn: dPVal,
      rn: rnVal === -1 ? undefined : rnVal
    });
  });
};

type ChartProps = ReturnType<typeof mapStateToProps>;

const Chart: React.FC<ChartProps> = ({ constants, args, functions }) => {
  useMemo(() => {
    values = [];
    recalculateValues(args, functions, constants, values);
    console.log(values);
  }, [constants, functions, args]);

  const tooltipFormatter = (value: string, name: string) => {
    if (name === 'xn') return [name];
    return [value, name];
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={values}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="x" domain={[constants.area.A - 1, constants.area.B + 1]} />
        <YAxis dataKey="f" domain={[constants.area.C - 0.1, constants.area.D + 0.1]} label="y" />
        <Tooltip
          wrapperStyle={{
            borderColor: 'white',
            boxShadow: '2px 2px 3px 0px #cccccc'
          }}
          contentStyle={{ backgroundColor: '#ffffff' }}
          labelStyle={{ fontWeight: 'bold', color: '#666666' }}
          formatter={tooltipFormatter}
        />
        <ReferenceLine y={0} stroke="black" strokeWidth={2} />
        <ReferenceLine x={0} stroke="black" strokeWidth={2} />
        <Line dataKey="xn" stroke="black" dot={true} />
        {functions.f.checked && <Line dataKey="f" stroke={colors.fColor} dot={false} />}
        {functions.Pn.checked && <Line dataKey="Pn" stroke={colors.PnColor} dot={false} />}
        {functions.df.checked && <Line dataKey="df" stroke={colors.dfColor} dot={false} />}
        {functions.dPn.checked && <Line dataKey="dPn" stroke={colors.dPnColor} dot={false} />}
        {functions.rn.checked && <Line dataKey="rn" stroke={colors.rnColor} dot={false} />}
        <Brush dataKey="x">
          <LineChart data={values} margin={{ top: 40, right: 40, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <YAxis hide domain={[constants.area.C, constants.area.D]} />
            <Line dataKey="f" stroke={colors.fColor} dot={false} />
            <Line dataKey="Pn" stroke={colors.PnColor} dot={false} />
          </LineChart>
        </Brush>
      </LineChart>
    </ResponsiveContainer>
  );
};

const mapStateToProps = (state: RootState) => ({
  constants: selectors.getConstants(state),
  args: selectors.getArgs(state),
  functions: selectors.getFunctions(state)
});

export const ChartContainer = connect(mapStateToProps)(Chart);
