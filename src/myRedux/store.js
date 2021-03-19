import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './rootReducer';
import { setLocalParams } from '../Calculations';

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__?.())
  );
  store.subscribe(setLocalParams);
  return store;
};
