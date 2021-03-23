import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { CheckBox } from './CheckBox';
import * as actions from '../../myRedux/actions';
import * as selectors from '../../myRedux/selectors';
import * as colors from '../colors';

const HeaderWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: space-around;
  user-select: none;
`;

type HeaderProps = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

const Header: React.FC<HeaderProps> = ({ functions, toggleFunctionVisibility }) => {
  return (
    <HeaderWrapper>
      <CheckBox
        label="f(x)"
        color={colors.fColor}
        checked={functions.f}
        onChange={() => toggleFunctionVisibility('f')}
      />
      <CheckBox
        label="Pn(x)"
        color={colors.PnColor}
        checked={functions.Pn}
        onChange={() => toggleFunctionVisibility('Pn')}
      />
      <CheckBox
        label="df(x)"
        color={colors.dfColor}
        checked={functions.df}
        onChange={() => toggleFunctionVisibility('df')}
      />
      <CheckBox
        label="dPn(x)"
        color={colors.dPnColor}
        checked={functions.dPn}
        onChange={() => toggleFunctionVisibility('dPn')}
      />
      <CheckBox
        label="rn(x)"
        color={colors.rnColor}
        checked={functions.rn}
        onChange={() => toggleFunctionVisibility('rn')}
      />
    </HeaderWrapper>
  );
};

const mapStateToProps = (state: RootState) => ({
  functions: selectors.getFunctionsChecked(state)
});

const mapDispatchToProps = {
  toggleFunctionVisibility: actions.toggleFunctionVisibility
};

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);
