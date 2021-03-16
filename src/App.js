import { useState } from 'react';
import styled from 'styled-components';

import { Chart } from './Chart';
import { Header } from './components/Header/Header';
import { InputBlock } from './components/InputBlock/InputBlock';

const AppWrapper = styled.div`
  font-family: sans-serif;
`;

export const App = () => {
  const [args, setArgs] = useState({
    leftBorder: -10,
    rightBorder: 10,
    step: 0.05
  });
  return (
    <AppWrapper>
      <Header />
      <div style={{ width: '95vw', height: '75vh' }}>
        <Chart leftBorder={args.leftBorder} rightBorder={args.rightBorder} step={args.step} />
      </div>
      <InputBlock />
    </AppWrapper>
  );
};
