import { ACTIONS } from "./ACTIONS";
import { helpFetchDiscography } from "../helpers/index";

export const setDiscographyData = (URL, query) => async (dispatch) => {
  const response = await helpFetchDiscography(URL, query);
  dispatch({ type: ACTIONS.SET_DISCOGRAPHY_DATA, payload: response.data.album });
};
