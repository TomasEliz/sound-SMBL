import { ACTIONS } from "../actions/ACTIONS";

const initState = {
  events: [],
}

export const eventsDataReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.SET_EVENTS_DATA:
      return {...state, events: action.payload};
    default:
      return state;
  }
};
