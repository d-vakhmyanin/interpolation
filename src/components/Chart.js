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

import * as selectors from '../myRedux/selectors';
import * as colors from './colors';

const recalculateValues = (props, arr) => {
  let tmp;
  arr = props.args?.x?.map((elem, index) => {
    tmp = props.args.xn.find((xn) => Math.abs(xn - elem) < props.constants.greek.delta);
    arr.push({
      x: elem === 0 ? 0 : elem.toFixed(3),
      xn: tmp ? 0 : undefined,
      f: props.f[index],
      df: props.df[index],
      Pn: props.Pn[index],
      dPn: props.dPn[index],
      rn: props.rn[index]
    });
  });
};

const Chart = (props) => {
  let values = [];
  useMemo(() => {
    recalculateValues(props, values);
    console.log(values);
  }, [props.functions]);

  const tooltipFormatter = (value, name) => {
    if (name === 'xn') return [name];
    return [value, name];
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={values}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="x" domain={[props.constants.area.A - 1, props.constants.area.B + 1]} />
        <YAxis
          dataKey="f"
          domain={[props.constants.area.C - 0.1, props.constants.area.D + 0.1]}
          label="y"
        />
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
        {props.fVisible && <Line dataKey="f" stroke={colors.fColor} dot={false} />}
        {props.PnVisible && <Line dataKey="Pn" stroke={colors.PnColor} dot={false} />}
        {props.dfVisible && <Line dataKey="df" stroke={colors.dfColor} dot={false} />}
        {props.dPnVisible && <Line dataKey="dPn" stroke={colors.dPnColor} dot={false} />}
        {props.rnVisible && <Line dataKey="rn" stroke={colors.rnColor} dot={false} />}
        <Brush dataKey="x">
          <LineChart data={values} margin={{ top: 40, right: 40, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <YAxis hide domain={[props.constants.area.C, props.constants.area.D]} />
            <Line dataKey="f" stroke={colors.fColor} dot={false} />
            <Line dataKey="Pn" stroke={colors.PnColor} dot={false} />
          </LineChart>
        </Brush>
      </LineChart>
    </ResponsiveContainer>
  );
};

export const ChartContainer = connect((state) => ({
  constants: selectors.getConstants(state),
  args: selectors.getArgs(state),
  functions: selectors.getFunctions(state),
  f: selectors.getFunctions(state)?.f?.values,
  fVisible: selectors.getFunctions(state)?.f?.checked,
  df: selectors.getFunctions(state)?.df?.values,
  dfVisible: selectors.getFunctions(state)?.df?.checked,
  Pn: selectors.getFunctions(state)?.Pn?.values,
  PnVisible: selectors.getFunctions(state)?.Pn?.checked,
  dPn: selectors.getFunctions(state)?.dPn?.values,
  dPnVisible: selectors.getFunctions(state)?.dPn?.checked,
  rn: selectors.getFunctions(state)?.rn?.values,
  rnVisible: selectors.getFunctions(state)?.rn?.checked
}))(Chart);
