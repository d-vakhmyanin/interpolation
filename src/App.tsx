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

const Info = styled.div`
  margin: 0 auto;
  margin-top: 30px;
  width: 300px;
  line-height: 20px;
`;

export const App = () => {
  return (
    <AppWrapper>
      <Header />
      <ChartWrapper>
        <Chart />
      </ChartWrapper>
      <InputBlock />
      <Info>
        Функция: α*sin(β*x)*cos(ε/(x-μ)^2)
        <br />
        Метод: Бесселя
        <br />
        Выполнил: Вахмянин Даниил, ИТ-31
      </Info>
    </AppWrapper>
  );
};
