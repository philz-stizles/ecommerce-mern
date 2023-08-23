import { SEARCH_QUERY } from '../actions/types';

export type SearchState = {
  text: string;
};

type SearchAction = { type: string; payload: any };

let INITIAL_STATE = { text: '' };

const searchReducer = (
  state: SearchState = INITIAL_STATE,
  action: SearchAction
) => {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_QUERY: {
      return { ...state, text: payload };
    }
    default:
      return state;
  }
};

export default searchReducer;
