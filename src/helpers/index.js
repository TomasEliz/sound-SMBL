import axios from "axios";


export const helpFetchArtistData = async (URL, query) => await axios.get(URL + query);

export const helpFetchDiscography = async (URL, query) => await axios.get(URL, query)

export const helpFetchArtistID = async (URL) => await axios.get(URL)

export const helpFetchEvents = async (URL) => await axios.get(URL)