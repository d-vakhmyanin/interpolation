import React, { useState } from 'react';
import styled from 'styled-components';

import { Input } from './Input';

const InputBlockWRapper = styled.div`
  width: 615px;
  margin: 0 auto;
  display: grid;
  grid-template-areas: 'firstCol secondCol thirdCol infoCol empty buttonCol';
  grid-template-columns: 1fr 1fr 1fr 140px 30px 160px;
`;

const ABCD = styled.div`
  grid-area: firstCol;
`;

const GreekLetters = styled.div`
  grid-area: secondCol;
`;

const Deltas = styled.div`
  grid-area: thirdCol;
  margin: auto 0;
`;

const Info = styled.div`
  grid-area: infoCol;
  margin: auto 0;
  padding: 10px;
  font-family: monospace;
  font-size: larger;
`;

const Button = styled.button`
  grid-area: buttonCol;
  height: 60px;
  margin: auto;
  width: 150px;
  background-color: #262690;
  color: white;
  border: 2px solid #262690;
  padding: 8px;
  cursor: pointer;
  font: inherit;
  font-size: large;
  outline: none;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? '0.2' : '1')};
`;

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const eValue = event.target.value;
    const eId = event.target.id;
    if (validate(eId, eValue)) event.target.style.outline = '';
    else {
      event.target.style.outline = '2px solid red';
      //setIsInputWrong(true)
    }
    //console.log(!parseFloat(eValue), eValue);
    setValue(eValue);
  };

  return { value, onChange };
};

const validate = (id, value) => {
  const floatV = parseFloat(value);
  const intV = parseInt(value);
  if (id < 8 && (!floatV || floatV < -100 || floatV > 100)) return false;
  else {
    if (id == 8 && (!intV || intV < 0 || intV > 200)) return false;
    else {
      if (id == 9 && (!floatV || floatV > 1 || floatV < 0.0001)) return false;
      else return true;
    }
  }
};

export const InputBlock = () => {
  const A = useInput('10');
  const B = useInput('10');
  const C = useInput('10');
  const D = useInput('10');

  const alpha = useInput('1');
  const beta = useInput('1');
  const epsilon = useInput('1');
  const mu = useInput('1');

  const n = useInput('50');
  const delta = useInput('0.01');

  return (
    <InputBlockWRapper>
      <ABCD>
        <Input id="0" label="A" {...A} />
        <Input id="1" label="B" {...B} />
        <Input id="2" label="C" {...C} />
        <Input id="3" label="D" {...D} />
      </ABCD>
      <GreekLetters>
        <Input id="4" label="α" {...alpha} />
        <Input id="5" label="β" {...beta} />
        <Input id="6" label="ε" {...epsilon} />
        <Input id="7" label="μ" {...mu} />
      </GreekLetters>
      <Deltas>
        <Input id="8" label="n" {...n} />
        <Input id="9" label="Δ" {...delta} />
      </Deltas>
      <Info>
        |max(rn)|={228}
        <br />
        argmax(rn)={1488}
      </Info>
      <Button onClick={() => {}}>Вычислить</Button>
    </InputBlockWRapper>
  );
};
