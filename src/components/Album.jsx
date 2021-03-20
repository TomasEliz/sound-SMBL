import React, { useEffect, useState } from "react";
import axios from "axios";

const Album = ({ artist, album }) => {
  const API_KEY = process.env.REACT_APP_AUDIO_DB_API_KEY;
  const URI = `https://theaudiodb.com/api/v1/json/${API_KEY}/track.php?m=${album.idAlbum}`;

  const [tracksData, setTracksData] = useState([]);

  console.log(tracksData);

  useEffect(() => {
    const fetchAlbumData = async () => {
      const tracksData = axios.get(URI);
      setTracksData((await tracksData).data);
    };

    fetchAlbumData();
  }, [URI]);

  return <section className="album"></section>;
};

export default Album;
