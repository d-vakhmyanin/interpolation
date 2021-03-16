import React from 'react';
import styled from 'styled-components';

import { CheckBox } from './CheckBox';
import * as colors from '../colors';

const HeaderWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: space-around;
  user-select: none;
`;

export const Header = () => {
  return (
    <HeaderWrapper>
      <CheckBox label="f(x)" color={colors.fColor} />
      <CheckBox label="Pn(x)" color={colors.PnColor} />
      <CheckBox label="df(x)" color={colors.dfColor} />
      <CheckBox label="dPn(x)" color={colors.dPnColor} />
      <CheckBox label="rn(x)" color={colors.rnColor} />
    </HeaderWrapper>
  );
};
