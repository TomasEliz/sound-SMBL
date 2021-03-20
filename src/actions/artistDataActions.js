import { ACTIONS } from "./ACTIONS";
import { helpFetchArtistData } from "../helpers/index";

export const setArtistData = (URL, query) => async (dispatch) => {
  const response = await helpFetchArtistData(URL, query);
  dispatch({
    type: ACTIONS.SET_ARTIST_DATA,
    payload: response.data.artists,
  });
};
