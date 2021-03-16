import React from 'react';
import styled from 'styled-components';

const CheckBoxWrapper = styled.div`
  display: inline-flex;
`;

const ColoredLine = styled.div`
  height: 3px;
  width: 20px;
  background-color: ${({ color }) => color};
  align-self: center;
  margin-left: 3px;
`;
export const CheckBox = ({ label, color = 'blue' }) => {
  return (
    <CheckBoxWrapper>
      <input type="checkbox" />
      {label}
      <ColoredLine color={color} />
    </CheckBoxWrapper>
  );
};
