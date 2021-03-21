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

const useInput = (initialValue, dispatch, isWrong) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    const eValue = event.target.value;
    const eId = event.target.id;
    if (validate(eId, eValue)) {
      event.target.style.outline = '';
      if (isWrong) dispatch(actions.setInputWrongness(false));
    } else {
      event.target.style.outline = '2px solid red';
      dispatch(actions.setInputWrongness(true));
    }
    setValue(eValue);
  };

  return { value, onChange };
};

const validate = (id, value) => {
  const floatV = parseFloat(value);
  const intV = parseInt(value);
  if (id < 8 && ((!floatV && floatV !== 0) || floatV < -100 || floatV > 100)) return false;
  else {
    if (id == 8 && (!intV || intV < 0 || intV > 100)) return false;
    else {
      if (id == 9 && (!floatV || floatV > 1 || floatV < 0.001)) return false;
      else return true;
    }
  }
};

const InputBlock = (props) => {
  const A = useInput(props.area.A, props.dispatch, props.isInputWrong);
  const B = useInput(props.area.B, props.dispatch, props.isInputWrong);
  const C = useInput(props.area.C, props.dispatch, props.isInputWrong);
  const D = useInput(props.area.D, props.dispatch, props.isInputWrong);

  const alpha = useInput(props.greek.alpha, props.dispatch, props.isInputWrong);
  const beta = useInput(props.greek.beta, props.dispatch, props.isInputWrong);
  const epsilon = useInput(props.greek.epsilon, props.dispatch, props.isInputWrong);
  const mu = useInput(props.greek.mu, props.dispatch, props.isInputWrong);

  const n = useInput(props.area.n, props.dispatch, props.isInputWrong);
  const delta = useInput(props.greek.delta, props.dispatch, props.isInputWrong);

  const handleSubmit = useCallback(() => {
    props.dispatch(
      actions.updateConstants(
        {
          alpha: parseFloat(alpha.value),
          beta: parseFloat(beta.value),
          epsilon: parseFloat(epsilon.value),
          mu: parseFloat(mu.value),
          delta: parseFloat(delta.value)
        },
        {
          A: parseFloat(A.value),
          B: parseFloat(B.value),
          C: parseFloat(C.value),
          D: parseFloat(D.value),
          n: parseInt(n.value)
        }
      )
    );
    props.dispatch(actions.calculateXAndFunctions());
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
        |max(rn)| = {props.maxRn?.toFixed(5)}
        <br />
        argmax(rn) = {props.maxRnIndex?.toFixed(3)}
      </Info>
      <Button disabled={props.isInputWrong} onClick={handleSubmit}>
        Вычислить
      </Button>
    </InputBlockWRapper>
  );
};
// props.functions?.rn?.value.indexOf(maxRn)
export const InputBlockContainer = connect((state) => ({
  args: selectors.getArgs(state),
  functions: selectors.getFunctions(state),
  area: selectors.getConstants(state).area,
  greek: selectors.getConstants(state).greek,
  isInputWrong: selectors.getIsInputWrong(state),
  maxRn: selectors.getMaxRn(state),
  maxRnIndex: selectors.getMaxRnIndex(state)
}))(InputBlock);
