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

const Header = (props) => {
  return (
    <HeaderWrapper>
      <CheckBox
        label="f(x)"
        color={colors.fColor}
        checked={props.fVisible}
        onChange={() => {
          props.dispatch(actions.toggleFunctionVisibility('f'));
        }}
      />
      <CheckBox
        label="Pn(x)"
        color={colors.PnColor}
        checked={props.PnVisible}
        onChange={() => {
          props.dispatch(actions.toggleFunctionVisibility('Pn'));
        }}
      />
      <CheckBox
        label="df(x)"
        color={colors.dfColor}
        checked={props.dfVisible}
        onChange={() => {
          props.dispatch(actions.toggleFunctionVisibility('df'));
        }}
      />
      <CheckBox
        label="dPn(x)"
        color={colors.dPnColor}
        checked={props.dPnVisible}
        onChange={() => {
          props.dispatch(actions.toggleFunctionVisibility('dPn'));
        }}
      />
      <CheckBox
        label="rn(x)"
        color={colors.rnColor}
        checked={props.rnVisible}
        onChange={() => {
          props.dispatch(actions.toggleFunctionVisibility('rn'));
        }}
      />
    </HeaderWrapper>
  );
};

export const HeaderContainer = connect((state) => ({
  f: selectors.getFunctions(state)?.f?.values,
  fVisible: selectors.getFunctions(state)?.f?.checked,
  dfVisible: selectors.getFunctions(state)?.df?.checked,
  PnVisible: selectors.getFunctions(state)?.Pn?.checked,
  dPnVisible: selectors.getFunctions(state)?.dPn?.checked,
  rnVisible: selectors.getFunctions(state)?.rn?.checked
}))(Header);
