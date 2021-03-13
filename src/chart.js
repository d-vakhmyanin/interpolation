import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  Area,
  ReferenceLine
} from 'recharts';

const mainFunction = (x) => {
  return Math.sin(x).toFixed(5);
};

const otherFunction = (x) => {
  return Math.cos(x).toFixed(5);
};

const calculateValues = (leftBorder, RightBorder, step, array) => {
  array.length = 0;
  let i = leftBorder;
  while (i <= RightBorder) {
    if (Math.abs(i) < step / 10) array.push({ x: 0, y1: mainFunction(0), y2: otherFunction(0) });
    else array.push({ x: i.toFixed(3), y1: mainFunction(i), y2: otherFunction(i) });
    i += step;
  }
};

export const Chart = ({ leftBorder, RightBorder, step, topBorder = 1, bottomBorder = -1 }) => {
  const values = [];
  let leftIndent = 0;
  let rightIndent = 0;
  const [indents, setIndents] = useState([leftIndent, rightIndent]);
  const [dots, setDots] = useState([]);
  const mainChart = useRef(null);
  useMemo(() => {
    calculateValues(leftBorder, RightBorder, step, values);
    leftIndent = (RightBorder - leftBorder) / (2 * step) - 1 / step;
    rightIndent = leftIndent + 2 / step;
    setIndents([leftIndent, rightIndent]);
    setDots(values);
    console.log(values, leftIndent);
  }, [leftBorder, RightBorder, step]);
  // useEffect(() => {
  //   if (mainChart.current === null) return;

  //   mainChart.current.onkeydown = () => {
  //     console.log('down');
  //   };
  //   console.log(mainChart);
  // }, []);

  return (
    <>
      <input placeholder={indents} />
      <ResponsiveContainer
        width="100%"
        height="80%"
        ref={mainChart}
        onkeydown={() => {
          console.log('down');
        }}
      >
        <LineChart data={dots} margin={{ top: 40, right: 40, bottom: 20, left: 20 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="x" domain={[leftBorder, RightBorder]} />
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
          <Brush dataKey="x" startIndex={indents[0]} endIndex={indents[1]} gap={1 / step}>
            <LineChart data={dots} margin={{ top: 40, right: 40, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <YAxis hide domain={[bottomBorder - 10 * step, topBorder + 10 * step]} />
              <Line dataKey="y1" stroke="#ff7300" dot={false} />
              <Line dataKey="y2" stroke="blue" dot={false} />
            </LineChart>
          </Brush>
        </LineChart>
      </ResponsiveContainer>
      <button
        onClick={() => {
          setIndents(() => [0, 0]);
          setDots((prev) => [...prev]);
        }}
      >
        показать график целиком
      </button>
      <button
        onClick={() => {
          leftIndent = (RightBorder - leftBorder) / (2 * step) - 1 / step;
          rightIndent = leftIndent + 2 / step;
          setIndents([leftIndent, rightIndent]);
          setDots((prev) => [...prev]);
        }}
        onKeyDown={() => {
          console.log('press');
        }}
      >
        часть графика
      </button>
    </>
  );
};
