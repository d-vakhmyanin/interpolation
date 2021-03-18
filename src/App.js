import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { ChartContainer as Chart } from './components/Chart';
import { HeaderContainer as Header } from './components/Header/Header';
import { InputBlockContainer as InputBlock } from './components/InputBlock/InputBlock';
import * as actions from './myRedux/actions';
import * as selectors from './myRedux/selectors';
import { setLocalParams } from './Calculations';

const AppWrapper = styled.div`
  font-family: sans-serif;
  overflow: hidden;
`;

const ChartWrapper = styled.div`
  width: 95vw;
  height: 75vh;
`;

const App = (props) => {
  useEffect(() => {
    setLocalParams();
    props.dispatch(actions.calculateX());
  }, []);
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

export const AppContainer = connect()(App);
