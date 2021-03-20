import { ACTIONS } from "../actions/ACTIONS";

const initState = {
  discography: []
}

export const discographyDataReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.SET_DISCOGRAPHY_DATA:
      return {...state, discography: action.payload};
    default:
      return (state);
  }
};
