import React, {useState} from 'react'
import '../css/top.css';
import 'bootstrap/dist/css/bootstrap.css';
import Song from './Song';

export default function Music() {

  const [track, setTrack] = useState('');
  const [results, setResults] = useState([]);

  const search = async e => {
    e.preventDefault();
    setResults(['x']);
    const tracks = await fetch('/music/search', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ track })
    });
    const data = await tracks.json();
    setResults(data.results);
    //setResults(data.results.trackmatches.track);
  }

  return (
    <div className='container text-center top width'>
      <h1 className='music-title mb-2'>Search Music:</h1>
      <form onSubmit={search} className='music-form mb-3'>
        <input type='text' onChange={(e) => setTrack(e.target.value)} />
        <button onClick={search}>Search</button>
      </form>
      <div className="row">
        {results[0] === 'x' ? 'Loading...' : results.map((song, i) => <Song key={i} id={i} track={song}/>)}
      </div>
    </div>
  )
}
