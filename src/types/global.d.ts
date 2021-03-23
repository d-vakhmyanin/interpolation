import { RootState as RootReducerState, RootAction } from '../myRedux/rootReducer';

declare global {
  type RootState = RootReducerState;
}

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
    RootState: RootState;
  }
}
