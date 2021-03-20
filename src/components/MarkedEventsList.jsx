import React from "react";
import skBanner from "../assets/powered-by-songkick-black.svg";
import skBadge from "../assets/sk-badge-black.svg";
import { useSelector } from "react-redux";

const MarkedEventsList = () => {
  const plannedEvents = useSelector(
    (state) => state.eventsListReducer.plannedEvents
  );

  return (
    <section className="events">
      <h2 className="events-artist-name">Marked Events</h2>
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
      <table className="events-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Country</th>
            <th>City</th>
            <th>Venue</th>
            <th>Date</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {plannedEvents.map((event) => (
            <tr key={event.id}>
              <td>
                {event.displayName.length > 10
                  ? event.displayName.slice(0, 8).concat("...")
                  : event.displayName}
              </td>
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
                <button>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default MarkedEventsList;
