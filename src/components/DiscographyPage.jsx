import React, { useEffect, useState } from "react";
import Header from "./Header";
import Modal from "react-modal";
import Album from "./Album";
import { useDispatch, useSelector } from "react-redux";
import { setDiscographyData } from "../actions/discographyDataActions";
import { v4 as uuidv4 } from "uuid";
import { customModal } from "../css/customStyles/customStyles";
import "../css/discography-page.css";

const DiscographyPage = ({ location: { state: artist } }) => {
  const [showModal, setShowModal] = useState(false);
  const [album, setAlbum] = useState("");
  const artistName = artist.strArtist;
  const API_KEY = process.env.REACT_APP_AUDIO_DB_API_KEY;
  const URL = `https://theaudiodb.com/api/v1/json/${API_KEY}/searchalbum.php?s=`;
  const dispatch = useDispatch();
  const discography = useSelector(
    (state) => state.discographyDataReducer.discography
  );

  useEffect(() => {
    dispatch(setDiscographyData(URL + artistName));
  }, [dispatch, URL, artistName]);

  return (
    <main>
      <Header artist={artist} />
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={customModal}
      >
        <Album artist={artist} album={album} />
      </Modal>
      <section className="discography">
        <h2 className="discography-artist-name">{artistName}</h2>
        <div className="discography-container">
          {discography &&
            discography
              .sort((a, b) => a.intYearReleased - b.intYearReleased)
              .map((album) => (
                <div className="discography-container-album" key={uuidv4()}>
                  <p className="discography-container-album-p">
                    {album.intYearReleased}
                  </p>
                  <div
                    className="discography-container-album-thumb"
                    onClick={() => {
                      setAlbum(album);
                      setShowModal(true);
                    }}
                  >
                    {album.strAlbumThumb ? (
                      <img src={album.strAlbumThumb} alt="album cover" />
                    ) : (
                      <span>{album.strAlbum[0]}</span>
                    )}
                  </div>
                  <p className="discography-container-album-p">
                    {album.strAlbum}
                  </p>
                  <p className="discography-container-album-p">
                    {album.strReleaseFormat}
                  </p>
                </div>
              ))}
        </div>
      </section>
    </main>
  );
};

export default DiscographyPage;
