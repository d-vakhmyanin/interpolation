import React, { useMemo } from 'react';
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

const mainFunction = (x) => {
  return Math.sin(x).toFixed(5);
};

const otherFunction = (x) => {
  return Math.cos(x).toFixed(5);
};

const calculateValues = (leftBorder, rightBorder, step, array) => {
  array.length = 0;
  let i = leftBorder;
  while (i <= rightBorder) {
    if (Math.abs(i) < step / 10) array.push({ x: 0, y1: mainFunction(0), y2: otherFunction(0) });
    else array.push({ x: i.toFixed(3), y1: mainFunction(i), y2: otherFunction(i) });
    i += step;
  }
};

export const Chart = ({ leftBorder, rightBorder, step, topBorder = 1, bottomBorder = -1 }) => {
  const values = [];
  let leftIndent = 0;
  let rightIndent = 0;
  useMemo(() => {
    calculateValues(leftBorder, rightBorder, step, values);
    leftIndent = (rightBorder - leftBorder) / (2 * step) - 1 / step;
    rightIndent = leftIndent + 2 / step;
    console.log(values, leftIndent);
  }, [leftBorder, rightBorder, step]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={values}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="x" domain={[leftBorder, rightBorder]} />
        <YAxis domain={[bottomBorder - 10 * step, topBorder + 10 * step]} label="y" />
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
        <Line dataKey="y1" stroke="#ff7300" dot={false} />
        <Line dataKey="y2" stroke="blue" dot={false} />
        <Line dataKey="y2" stroke="#febb" dot={false} />
        <Line dataKey="y2" stroke="#fbb" dot={false} />
        <Line dataKey="y2" stroke="#123" dot={false} />
        <Line dataKey="y2" stroke="#f234" dot={false} />
        <Brush dataKey="x">
          <LineChart data={values} margin={{ top: 40, right: 40, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <YAxis hide domain={[bottomBorder - 10 * step, topBorder + 10 * step]} />
            <Line dataKey="y1" stroke="#ff7300" dot={false} />
            <Line dataKey="y2" stroke="blue" dot={false} />
          </LineChart>
        </Brush>
      </LineChart>
    </ResponsiveContainer>
  );
};
