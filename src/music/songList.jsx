import React from "react";
import { Link } from "react-router-dom";

import mockSongs from "../mockSongs";

let localStorage = window.localStorage;

export default class SongList extends React.Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem("songs")) {
      localStorage.setItem("songs", JSON.stringify(mockSongs));
    }

    this.state = {
      songs: JSON.parse(localStorage.getItem("songs"))
    };
  }

  render() {
    return (
      <div>
        {this.state.songs.map((song, key) => {
          const desc = song.description.slice(0, 250);
          return (
            <Link className="songList item" key={key} to={`/song/${song.id}`}>
              <h2>{song.title}</h2>
              <p>{desc}...</p>
            </Link>
          );
        })}
      </div>
    );
  }
}
