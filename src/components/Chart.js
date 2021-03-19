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
  let i = 0;
  arr = props.args?.x?.map((elem, index) => {
    arr.push({
      x: elem.toFixed(3),
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
            boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)'
          }}
          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
          labelStyle={{ fontWeight: 'bold', color: '#666666' }}
        />
        <ReferenceLine y={0} stroke="black" strokeWidth={2} />
        <ReferenceLine x={0} stroke="black" strokeWidth={2} />
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
