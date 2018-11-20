import React, {useState} from 'react'
import '../css/top.css';
import '../css/music.css';
import 'bootstrap/dist/css/bootstrap.css';
import Song from './Song';
import { Form, FormGroup, Label, Input, Button, Row, Col, FormFeedback } from 'reactstrap';

export default function Music() {

  const [track, setTrack] = useState('');
  const [num, setNum] = useState('');
  const [results, setResults] = useState([[]]);
  const [page, setPage] = useState(0);
  const [valid, setValid] = useState(true);

  const search = async e => {
    e.preventDefault();
    if (track === '') {
      setValid(false);
    } else {
      setResults(['x']);
      const tracks = await fetch('/music/search', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ track, num })
      });
      const data = await tracks.json();
      setResults(data);
      setTrack('');
      setValid(true);
    }
  }

  const nextPage = () => {
    if (results.length-1 > page && results !== [[]]) {
      setPage(page+1);
    }
  }

  const prevPage = () => {
    if (page > 0) {
      setPage(page-1);
    }
  }

  return (
    <div className='container text-center top width'>
      <h2 className='music-title mb-2'>Search Music:</h2>
      <Form onSubmit={search}>
        <Row form className="text-left">
          <Col md={6}>
            <FormGroup>
              <Label for="search">Term:</Label>
              {valid ? (
                <Input bsSize='sm' id="search" type='text' onChange={(e) => setTrack(e.target.value)} />
              ) : (
                <div>
                  <Input invalid bsSize='sm' id="search" type='text' onChange={(e) => setTrack(e.target.value)} />
                  <FormFeedback>You gotta search something though <span role="img" aria-label="jsx-a11y/accessible-emoji">😂</span> </FormFeedback>
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="num">Results:</Label>
              <Input bsSize='sm' placeholder="1-200" id="num" type='text' onChange={(e) => setNum(e.target.value)} />
            </FormGroup>
          </Col>
        </Row>
        <Button className='search-btn mb-3' onSubmit={search}>Search</Button>
      </Form>
      {results.length === 1 ? '' : (
        <div>
          <button className='back button' onClick={() => prevPage()}>Back</button>
          <span className="page-num">{page+1}</span>
          <button className='next button' onClick={() => nextPage()}>Next</button>
        </div>
      )}
        {results[0] === 'x' ? 'Loading...' : results[page].map((song, i) => i===0 || i===2 ? (
            results[page][i+1] ? (
              <div key={i} className="row">
                <Song track={song} id={song.trackId} key={song.trackId} size={6}/>
                <Song track={results[page][i+1]} id={results[page][i+1].trackId} key={results[page][i+1].trackId} size={6}/>
              </div>
            ) : (
              <div key={i} className="row">
                <Song track={song} id={song.trackId} key={song.trackId} size={12}/>
              </div>
            )
          ) : (
            ''
          ))}
      {}
      {results.length === 1 ? '' : (
        <div>
          <button className='back button' onClick={() => prevPage()}>Back</button>
          <span className="page-num">{page+1}</span>
          <button  className='next button' onClick={() => nextPage()}>Next</button>
        </div>
      )}
    </div>
  )
}
