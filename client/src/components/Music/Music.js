import React, {useState} from 'react'
import '../../css/top.css';
import '../../css/music.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, FormGroup, Label, Input, Button, Row, Col, FormFeedback } from 'reactstrap';
import { ClimbingBoxLoader } from 'react-spinners';
import NotFound from './NotFound';
import JukeBox from './JukeBox';

export default () => {

  const [track, setTrack] = useState('');
  const [num, setNum] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [valid, setValid] = useState(true);
  const [found, setFound] = useState(true);

  const search = async e => {
    e.preventDefault();
    document.getElementById("num").value = "";
    document.getElementById("search").value = "";
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
      if (data.length === 0) {
        setFound(false);
        setTrack('');
        setValid(true);
      } else {
        let music = [{}];
        music = music.concat(data);
        setResults(music);
        setTrack('');
        setValid(true);
        setFound(true);
      }
    }
  }

  const nextPage = () => {
    if (results.length-1 > page && results !== []) {
      document.getElementById(results[page].trackId.toString()).pause();
      setPage(page+1);
    }
  }

  const prevPage = () => {
    if (page > 1) {
      document.getElementById(results[page].trackId.toString()).pause();
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
      {results.length === 0 ? '' : (
        results.map((song, i) => {
          if (i !== 0) {
            return (
              <div key={i}>
                <audio id={results[i].trackId}>
                  <source src={song.previewUrl} />
                </audio>
              </div>
              )
          } else return "";
        })
      )}
      {results.length === 0 ? '' : (
        <div>
          <button className='back button' onClick={() => prevPage()}>Back</button>
          <span className="page-num">{page}</span>
          <button className='next button' onClick={() => nextPage()}>Next</button>
        </div>
      )}
      {results.length === 0 ? '' : (
        !found ? (
          <NotFound />
        ) : (
          results[0] === 'x' ? <div className="loader"><ClimbingBoxLoader className="mx-auto" color={'#4cb0de'} size={25} margin={25} /></div> : (
            <div className="juke">
              <JukeBox track={results[page]} tracks={results}/>
            </div>
          )
        )
      )}
    </div>
  )
}
