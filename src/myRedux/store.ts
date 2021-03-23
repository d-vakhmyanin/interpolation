import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './rootReducer';
import { setLocalParams } from '../Calculations';
import { rootSaga } from './rootSaga';

const saga = createSagaMiddleware();

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(saga), (window as any).__REDUX_DEVTOOLS_EXTENSION__?.())
  );
  saga.run(rootSaga);
  store.subscribe(setLocalParams);
  return store;
};
