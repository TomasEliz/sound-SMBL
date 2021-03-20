import React, { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import { useSelector, useDispatch } from "react-redux";
import "../css/info-page.css";
import ErrorHeader from "./ErrorHeader";
import { setArtistData } from "../actions/artistDataActions";

const InfoPage = ({ location: { state: text } }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const API_KEY = process.env.REACT_APP_AUDIO_DB_API_KEY;
  const artistURL = `https://theaudiodb.com/api/v1/json/${API_KEY}/search.php?s=`;
  const artistData = useSelector((state) => state.artistDataReducer.artistData);

  const memoizeDispatch = useCallback(() => {
    dispatch(setArtistData(artistURL, text));
  }, [dispatch, artistURL, text]);

  useEffect(() => {
    memoizeDispatch();
  }, [memoizeDispatch]);

  if (!artistData)
    return (
      <main>
        <ErrorHeader />
        <section className="artist-preview">
          <h1>404 ARTIST NOT FOUND</h1>
        </section>
      </main>
    );

  const artist = artistData[0];

  return (
    <main>
      <Header artist={artist} />
      {artist && (
        <section className="artist-preview">
          <h2 className="artist-preview-artist-name">{artist.strArtist}</h2>
          <div className="artist-preview-img-container">
            <img
              src={artist.strArtistBanner || artist.strArtistFanart}
              alt="artist"
            />
          </div>
          <div className="artist-preview-details">
            <ul className="artist-preview-details-ul">
              <li className="artist-preview-details-ul-li">
                <label>formed:</label>
                <p>{artist.intFormedYear}</p>
              </li>
              <li className="artist-preview-details-ul-li">
                <label>members:</label>
                <p>{artist.intMembers}</p>
              </li>
              <li className="artist-preview-details-ul-li">
                <label>active:</label>
                <p>{artist.strDisbanded ? "no" : "yes"}</p>
              </li>
              <li className="artist-preview-details-ul-li">
                <label>country:</label>
                <p>{artist.strCountryCode}</p>
              </li>
              <li className="artist-preview-details-ul-li">
                <label>genre:</label>
                <p>{artist.strGenre}</p>
              </li>
              <li className="artist-preview-details-ul-li">
                <label>web:</label>
                <a
                  href={
                    "http://" + artist.strWebsite ||
                    artist.strFacebook ||
                    artist.strTwitter
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  {artist.strWebsite ||
                    artist.strFacebook ||
                    artist.strTwitter ||
                    "n/a"}
                </a>
              </li>
            </ul>
          </div>
          <article className="artist-preview-article">
            <h3>Biography</h3>
            <p className={!show ? "artist-preview-article-p" : undefined}>
              {artist.strBiographyEN || "n/a"}
            </p>
            {artist.strBiographyEN && !show ? (
              <div onClick={() => setShow(true)} className="read-more">
                read more
              </div>
            ) : (
              artist.strBiographyEN &&
              show && (
                <div onClick={() => setShow(false)} className="show-less">
                  show less
                </div>
              )
            )}
          </article>
        </section>
      )}
    </main>
  );
};

export default InfoPage;
