import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { setEventsData } from "../actions/eventsDataActions";
import { addToEvents } from "../actions/eventsListActions";
import skBanner from "../assets/powered-by-songkick-black.svg";
import skBadge from "../assets/sk-badge-black.svg";
import {AiOutlineStop} from 'react-icons/ai'
import "../css/events-page.css";

const EventsPage = ({ location: { state: artist } }) => {
  const [checked, setChecked] = useState(false)
  const API_KEY = process.env.REACT_APP_SONGKICK_API_KEY;
  const artistName = artist.strArtist.toLowerCase().replace(/(\s)/g, "_");
  const URL = `https://api.songkick.com/api/3.0/search/artists.json?apikey=${API_KEY}&query=${artistName}`;
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventsDataReducer.events);
  const plannedEvents = useSelector(state => state.eventsListReducer.plannedEvents)

  const addConcert = (concert) => {
    const isFound = plannedEvents.find(item => item.id === concert.id)
    if(isFound) return setChecked(true) 
    dispatch(addToEvents(concert))
  }

  const memoizeDispatch = useCallback(() => {
    dispatch(setEventsData(URL))
  }, [dispatch, URL])

  useEffect(() => {
    memoizeDispatch();
  }, [memoizeDispatch, URL]);

  return (
    <main onClickCapture={() => setChecked(false)} >
      <Header artist={artist} />
      <section className="events">
        <h2 className="events-artist-name">
          {artist.strArtist} <span>upcoming events</span>
        </h2>
        <a
          href="http://www.songkick.com"
          className="events-banner"
          target="_blank"
          title="songkick.com"
          rel="noreferrer"
        >
          <img
            className="events-banner-img"
            src={skBanner}
            alt="songkick banner"
          />
        </a>
        {checked && <h2 className='events-checked'><AiOutlineStop /> Already marked as interested</h2>}
        {events ? (
          <table className="events-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>City</th>
                <th>Venue</th>
                <th>Date</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.venue.metroArea.country.displayName}</td>
                  <td>{event.venue.metroArea.displayName}</td>
                  <td>{event.venue.displayName}</td>
                  <td>{event.start.date}</td>
                  <td>
                    <a
                      href={event.uri}
                      target="_blank"
                      rel="noreferrer"
                      title="songkick event page"
                    >
                      <img
                        className="events-table-badge"
                        src={skBadge}
                        alt="songkick"
                      />
                    </a>
                  </td>
                  <td>
                    <button
                      onClickCapture={() => addConcert(event)}
                    >
                      Interested
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <h2 className='events-no-events' >No upcoming events</h2>}
      </section>
    </main>
  );
};

export default EventsPage;
