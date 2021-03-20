import { ACTIONS } from "../actions/ACTIONS";

const initState = {
  artistData: {},
};

export const artistDataReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.SET_ARTIST_DATA:
      return { ...state, artistData: action.payload };
    default:
      return state;
  }
};
