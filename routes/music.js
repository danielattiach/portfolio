const express = require('express');
const router = express.Router();
const key = require('../config/keys').lastFMAPI;
const fetch = require('node-fetch');
const axios = require('axios');

//https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_track=This%20Way&q_artist=Khalid&quorum_factor=1&apikey=40ebe084af9dfbfaa5aa48201958327b

/*
router.post('/search', async (req, res) => {
  const track = "&q_track=" + req.body.track;
  const artist = "&q_artist=" + req.body.artist;
  const apikey = "&apikey=" + key;
  const getter = await axios("https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=x&s_track_rating=desc"+track+apikey);
  const data = JSON.parse(getter.data.substring(2, getter.data.length-2));
  res.send(data.message.body.track_list);
});
*/

//http://ws.audioscrobbler.com/2.0/?method=track.search&track=&api_key=&format=json
/*
router.post('/search', async (req, res) => {
  const track = "&track=" + req.body.track;
  const artist = "&artist=" + req.body.artist;
  const apikey = "&api_key=" + key;
  const getter = await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search${track}${apikey}&format=json`);
  const data = await getter.json();
  res.send(data);
});
*/


function paginate(list, howMany) {
  var result = []
  let input = list.slice(0)
  while (input[0]) {
    result.push(input.splice(0, howMany))
  }
  return result;
}

router.post('/search', async (req, res) => {
  const track = "&track=" + req.body.track;
  const num = req.body.num || 40;
  const artist = "&artist=" + req.body.artist;
  const apikey = "&api_key=" + key;
  const getter = await fetch(`https://itunes.apple.com/search?term=${req.body.track}&entity=song&media=music&limit=${num}`);
  const data = await getter.json();
  //const paginated = paginate(data.results, 4);
  res.send(data.results);
});

module.exports = router;
