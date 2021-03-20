import { combineReducers } from "redux";
import { artistDataReducer } from "./artistDataReducer";
import { discographyDataReducer } from "./discographyDataReducer";
import { eventsDataReducer } from "./eventsDataReducer";
import { eventsListReducer } from "./eventsListReducer";

const rootReducer = combineReducers({
  artistDataReducer,
  discographyDataReducer,
  eventsDataReducer,
  eventsListReducer,
});

export default rootReducer;
