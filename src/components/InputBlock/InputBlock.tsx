import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { Input } from './Input';
import * as actions from '../../myRedux/actions';
import * as selectors from '../../myRedux/selectors';

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

const useInput = (
  initialValue: number,
  setInputWrongness: (isInputWrong: boolean) => void,
  isWrong: boolean
) => {
  const [value, setValue] = useState(initialValue.toString());
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eValue = event.target.value;
    const eId = event.target.id;
    if (validate(eId, eValue)) {
      event.target.style.outline = '';
      if (isWrong) setInputWrongness(false);
    } else {
      event.target.style.outline = '2px solid red';
      setInputWrongness(true);
    }
    setValue(eValue);
  };

  return { value, onChange };
};

const validate = (strId: string, value: string) => {
  const id = parseInt(strId);
  const floatV = parseFloat(value);
  const intV = parseInt(value);
  if (id < 8 && ((!floatV && floatV !== 0) || floatV < -100 || floatV > 100)) return false;
  else if (id === 8 && (!intV || intV < 0 || intV > 100)) return false;
  else if (id === 9 && (!floatV || floatV > 1 || floatV < 0.001)) return false;
  else return true;
};

type InputBlockProps = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;
let f = false;
const InputBlock: React.FC<InputBlockProps> = ({
  constants,
  isInputWrong,
  maxRn,
  maxRnIndex,
  args,
  setInputWrongness,
  updateConstants,
  calculateXAndFunctions
}) => {
  const A = useInput(constants.area.A, setInputWrongness, isInputWrong);
  const B = useInput(constants.area.B, setInputWrongness, isInputWrong);
  const C = useInput(constants.area.C, setInputWrongness, isInputWrong);
  const D = useInput(constants.area.D, setInputWrongness, isInputWrong);
  const n = useInput(constants.area.n, setInputWrongness, isInputWrong);

  const alpha = useInput(constants.greek.alpha, setInputWrongness, isInputWrong);
  const beta = useInput(constants.greek.beta, setInputWrongness, isInputWrong);
  const epsilon = useInput(constants.greek.epsilon, setInputWrongness, isInputWrong);
  const mu = useInput(constants.greek.mu, setInputWrongness, isInputWrong);
  const delta = useInput(constants.greek.delta, setInputWrongness, isInputWrong);

  const handleSubmit = useCallback(() => {
    const localConstants = {
      greek: {
        alpha: parseFloat(alpha.value),
        beta: parseFloat(beta.value),
        epsilon: parseFloat(epsilon.value),
        mu: parseFloat(mu.value),
        delta: parseFloat(delta.value)
      },
      area: {
        A: parseFloat(A.value),
        B: parseFloat(B.value),
        C: parseFloat(C.value),
        D: parseFloat(D.value),
        n: parseInt(n.value)
      }
    };
    if (JSON.stringify(localConstants) === JSON.stringify(constants) && f) return;
    f = true;
    updateConstants(localConstants);
    calculateXAndFunctions();
  }, [A, B, C, D, alpha, beta, epsilon, mu, delta, n]);

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
        |max(rn)| = {maxRn?.toFixed(5)}
        <br />
        argmax(rn) = {maxRnIndex?.toFixed(3)}
      </Info>
      <Button disabled={isInputWrong} onClick={handleSubmit}>
        Вычислить
      </Button>
    </InputBlockWRapper>
  );
};

const mapStateToProps = (state: RootState) => ({
  constants: selectors.getConstants(state),
  args: selectors.getArgs(state),
  isInputWrong: selectors.getIsInputWrong(state),
  maxRn: selectors.getMaxRn(state),
  maxRnIndex: selectors.getMaxRnIndex(state)
});

const mapDispatchToProps = {
  setInputWrongness: actions.setInputWrongness,
  updateConstants: actions.updateConstants,
  calculateXAndFunctions: actions.calculateXAndFunctions
};

export const InputBlockContainer = connect(mapStateToProps, mapDispatchToProps)(InputBlock);
