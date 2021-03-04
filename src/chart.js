import { React } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  AreaChart,
  Area
} from 'recharts';

const mainFunction = (x) => {
  return Math.sin(x);
};

const otherFunction = (x) => {
  return Math.cos(x);
};

const values = [];

const calculateValues = (leftBorder, RightBorder, step) => {
  let i = leftBorder;
  while (i < RightBorder) {
    values.push({ x: i, y1: mainFunction(i), y2: otherFunction(i) });
    i += step;
  }
};

export const Chart = ({ leftBorder, RightBorder, step }) => {
  calculateValues(leftBorder, RightBorder, step);
  console.log(values);
  return (
    <ResponsiveContainer width="100%" height="80%">
      <LineChart width={600} height={400} data={values} margin={{ top: 40, right: 40, bottom: 20, left: 20 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="x" label="Аргумент" />
        <YAxis domain={['auto', 'auto']} label="y" />
        <Tooltip
          wrapperStyle={{
            borderColor: 'white',
            boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)'
          }}
          contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
          labelStyle={{ fontWeight: 'bold', color: '#666666' }}
        />
        <Line dataKey="y1" stroke="#ff7300" dot={false} />
        <Brush dataKey="x" startIndex={values.length - 40}>
          <AreaChart>
            <CartesianGrid />
            <YAxis hide domain={['auto', 'auto']} />
            <Area dataKey="x" stroke="#ff7300" fill="#ff7300" dot={false} />
          </AreaChart>
        </Brush>
      </LineChart>
    </ResponsiveContainer>
  );
};
