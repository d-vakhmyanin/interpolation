import { fork, put, select, takeEvery } from 'redux-saga/effects';

import { calculateX, calculateFunctions, calculateXAndFunctions } from './actions';
import { ArgsState } from './reducers';
import { getArgs } from './selectors';

function* calculationWorker() {
  yield put(calculateX());
  const args: ArgsState = yield select(getArgs);
  yield put(calculateFunctions(args));
}

function* watchCalculateXAndFunctions() {
  yield takeEvery(calculateXAndFunctions, calculationWorker);
}
export function* rootSaga() {
  yield fork(watchCalculateXAndFunctions);
}
