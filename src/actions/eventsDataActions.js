import { ACTIONS } from "./ACTIONS";
import { helpFetchArtistID } from "../helpers/index";
import {helpFetchEvents} from '../helpers/index'

export const setEventsData = (URL) => async (dispatch) => {
  const API_KEY = process.env.REACT_APP_SONGKICK_API_KEY
  const responseForID = await helpFetchArtistID(URL);
  const artistId = await responseForID.data.resultsPage.results.artist[0].id
  const responseForEvents = await helpFetchEvents(`https://api.songkick.com/api/3.0/artists/${artistId}/calendar.json?apikey=${API_KEY}
  `)
  dispatch({ type: ACTIONS.SET_EVENTS_DATA, payload: responseForEvents.data.resultsPage.results.event });
};
