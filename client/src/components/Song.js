import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../css/music.css';

export default function Song({track}) {

  return (
    <div className='col-md-6'>
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5>{track.artistName}</h5>
          <img src={track.artworkUrl100} alt="album cover art" className='img-fluid song-img' />
          <p className="card-text">
            <strong><i className="fas fa-play"></i> Track</strong>: {track.trackName}
            <br />
            <audio controls>
              <source src={track.previewUrl} />
            </audio>
            <br />
            <strong><i className="fas fa-compact-disc"></i> Album</strong>: {track.collectionName}
          </p>
        </div>
      </div>
    </div>
  )
}
