import { createStore } from 'redux';

import { rootReducer } from './rootReducer';
import { setLocalParams } from '../Calculations';

export const configureStore = () => {
  const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());
  store.subscribe(setLocalParams);
  return store;
};
