import { DRAWER_TOGGLE } from '../actions/types';

export type DrawerState = {
  isVisible: boolean;
};

type DrawerAction = { type: string; payload: boolean };

const INITIAL_STATE = { isVisible: false };

const drawerReducer = (
  state: DrawerState = INITIAL_STATE,
  action: DrawerAction
) => {
  const { type, payload } = action;
  switch (type) {
    case DRAWER_TOGGLE:
      return { ...state, isVisible: payload };
    default:
      return state;
  }
};

export default drawerReducer