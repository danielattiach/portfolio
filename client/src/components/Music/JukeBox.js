import React, { useState } from 'react'
import '../../css/jukebox.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
// <!--     <div class="jukebox__rating"></div> -->

export default ({track, tracks}) => {
  const [play, setPlay] = useState(false);
  const [modal, setModal] = useState(false);
  const [current, setCurrent] = useState(tracks[1]);

  const toggle = () => {
    setModal(!modal);
  }

  const play_pause = (cmd) => {
    if (cmd) {
      document.getElementById(current.trackId.toString()).play();
    } else {
      document.getElementById(current.trackId.toString()).pause();
    }
    setPlay(!play);
    return 'done';
  }

  const pick = (e) => {
    setCurrent(tracks[e.target.className.split("-")[1]]);
  }

  document.addEventListener("DOMContentLoaded", (event) => {
    enableGalleryScroll();
    initActionButtons();

  });

  let THRESHOLD = 0.1,
      MAX_SPEED = 25,
      LEFT = 'left',
      RIGHT = 'right',
      scrolling,
      pageX,
      screenWidth;

  const enableGalleryScroll = () => {
    var gallery = document.getElementById('gallery');

    gallery.onmouseover = (event) => {
      pageX = event.clientX || event.screenX;
      screenWidth = window.innerWidth;
      var currentPosPercentage = (screenWidth - pageX) / screenWidth;
      var speed;

      if (currentPosPercentage > THRESHOLD ) {
        speed = calculateSpeed(LEFT, currentPosPercentage);
        setScroll(gallery, LEFT, speed)
      } else if (currentPosPercentage < (1 - THRESHOLD)) {
        speed = calculateSpeed(RIGHT, currentPosPercentage);
        setScroll(gallery, RIGHT, speed)
      } else {
        endScroll();
      }

    }
  }

  const calculateSpeed = (direction, ratio) => {
    var positionPercentage = direction === LEFT ? ratio : 1 - ratio,
        speedPercentage = (positionPercentage - THRESHOLD) / (1 - THRESHOLD);
    return speedPercentage * MAX_SPEED;
  }

  const endScroll = () => {
    clearInterval(scrolling);
  }

  const setScroll = (object, direction, speed) => {
    endScroll();
    scrolling = setInterval(() => {
      var newPos = direction === LEFT ? (-1 * speed) : speed;
      object.scrollLeft += newPos
    }, 10);
  }

  const initActionButtons = () => {
    var fullScreenButton = document.getElementById('requestFullScreen');
    fullScreenButton.addEventListener('click', setFullScreen);

    var expandButton = document.getElementById('toggleExpand');
    expandButton.addEventListener('click', toggleExpand);
  }

  const toggleExpand = () => {
    document.getElementById('gallery')
            .classList
            .toggle('expanded');
  }

  const launchIntoFullscreen = (element) => {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  const setFullScreen = () => {
    var elem = document.getElementById('fullscreen');
    launchIntoFullscreen(elem);

  }

  return (
    <div>
      <div className="jukebox">
        <div className="jukebox__head">
          <div className="jukebox__record">
            <img className="jukebox__record-image" src={current.artworkUrl100} alt="album artwork" />
          </div>
        </div>
        <div className="jukebox__body">
          <div className="text-center">
              <div className="gallery centerized" id="gallery">
                {tracks.map((song, i) => {
                  if (i !== 0) {
                    return (
                      <div key={"song-"+i} className={"song-"+i} onClick={pick}>
                        <span className={"song-"+i}>{song.artistName}</span>
                        <img className={"song-"+i} src={song.artworkUrl60} alt={song.collectionName}/>
                      </div>
                    )
                  } else return "";
                })}
              </div>
          </div>
          <div className="jukebox__internal">
            <Row>
              <Col xs={{ size: 3, order: 1, offset: 1 }}>
                <span className='play'><i className="fa fa-play-circle" onClick={() => play_pause(1)}></i></span>
              </Col>
              <Col xs={{ size: 3, order: 1, offset: 0 }}>
                <span className='pause'><i className="fa fa-pause-circle" onClick={() => play_pause(0)}></i></span>
              </Col>
              <Col xs={{ size: 3, order: 1, offset: -1 }}>
                <span className="track-info" onClick={toggle}><i className="fas fa-info-circle"></i></span>
              </Col>
            </Row>
            <div>
              <Modal isOpen={modal} toggle={toggle} className="" size="sm">
                <ModalHeader toggle={toggle}>Track information:</ModalHeader>
                <ModalBody>
                <div>
                  <Card>
                    <CardImg top max-height={60} max-width={60} src={current.artworkUrl100} alt="Card image cap" />
                    <CardBody>
                      <CardTitle>{current.trackName}</CardTitle>
                      <CardSubtitle> Artist: {current.artistName} </CardSubtitle>
                      <CardText>
                        Genre: {current.primaryGenreName}<br />
                        <a href={current.trackViewUrl} target="_blank" rel="noopener noreferrer">View on iTunes</a>
                      </CardText>
                    </CardBody>
                  </Card>
                </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggle}>Close</Button>
                </ModalFooter>
              </Modal>
            </div>
            <div className="text-center mx-auto">
              <div className="song-div mx-auto metal linear"><p className="song-text">{current.trackName}</p></div>
            </div>
          </div>
        </div>
        <div className="jukebox__leg jukebox__leg--left"></div>
        <div className="jukebox__leg jukebox__leg--right"></div>
      </div>
    </div>
  )
}
