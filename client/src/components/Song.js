import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/music.css';

export default function Song({track, id, size}) {

  const [play, setPlay] = useState(false);

  return (
    <div className={'col-md-'+size}>
      <div className="card mb-4 shadow-sm">
        <div className="card-body text-center">
          <h5>{track.artistName}</h5>
          <img src={track.artworkUrl100} alt="album cover art" className='img-fluid song-img' />
          <p className="card-text">
            <strong><i className="fas fa-play"></i> Track</strong>: {track.trackName}
            <br />
            <audio id={id}>
              <source src={track.previewUrl} />
            </audio>
            {!play ? <span className='play'><i className="fa fa-play-circle" onClick={() => {
              document.getElementById(id.toString()).play()
              setPlay(!play);
            }}></i></span> : <span className='pause'><i className="fa fa-pause-circle" onClick={() => {
              document.getElementById(id.toString()).pause();
              setPlay(!play);
            }}></i></span>}
            <br />
            <strong><i className="fas fa-compact-disc"></i> Album</strong>: {track.collectionName}
          </p>
        </div>
      </div>
    </div>
  )
}
