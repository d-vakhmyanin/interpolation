import styled from 'styled-components';

import { ChartContainer as Chart } from './components/Chart';
import { HeaderContainer as Header } from './components/Header/Header';
import { InputBlockContainer as InputBlock } from './components/InputBlock/InputBlock';

const AppWrapper = styled.div`
  font-family: sans-serif;
  overflow: hidden;
`;

const ChartWrapper = styled.div`
  width: 95vw;
  height: 75vh;
`;

export const App = () => {
  return (
    <AppWrapper>
      <Header />
      <ChartWrapper>
        <Chart />
      </ChartWrapper>
      <InputBlock />
    </AppWrapper>
  );
};
