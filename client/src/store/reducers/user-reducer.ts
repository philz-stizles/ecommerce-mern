import { User } from '../../types';
import { LOGOUT, SET_AUTH_STATE } from '../actions/types';

export type UserState = User | null;

type UserAction = { type: string; payload: any };

const INITIAL_STATE = null;

const userReducer = (state: UserState = INITIAL_STATE, action: UserAction) => {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTH_STATE:
      return payload;
    case LOGOUT:
      return payload;
    default:
      return state;
  }
};

export default userReducer;
