import { ACTIONS } from "../actions/ACTIONS";

const initState = {
  plannedEvents: [],
}

export const eventsListReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_EVENTS:
      return {...state, plannedEvents: [action.payload, ...state.plannedEvents]};
    default:
      return state;
  }
};
