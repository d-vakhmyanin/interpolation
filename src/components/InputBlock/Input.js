import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 85px;
  padding: 3px;
`;

const LabelWrapper = styled.span`
  margin-right: 2px;
`;

const StyledInput = styled.input`
  width: 50px;
  margin: 3px;
`;

export const Input = ({ label, id, value, onChange }) => {
  return (
    <InputWrapper>
      <LabelWrapper>{label}</LabelWrapper>
      <StyledInput id={id} value={value} onChange={onChange} />
    </InputWrapper>
  );
};
