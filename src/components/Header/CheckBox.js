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
export const CheckBox = ({ label, color = 'blue', checked = '', onChange }) => {
  return (
    <CheckBoxWrapper>
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
      </label>
      <ColoredLine color={color} />
    </CheckBoxWrapper>
  );
};
