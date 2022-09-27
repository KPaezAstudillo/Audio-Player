import React, { useEffect, useState, useRef } from 'react';
// import SongItem from './components/songItem';
import * as config from './config';
import { getFetch } from './libs';
import './App.css'
import Button from './components/Button';
import { faBackward, faPlay, faForward, faPause } from '@fortawesome/free-solid-svg-icons'

const App = () => {
  const [songs, setSong] = useState(null);
  const URL_ROOT = 'http://assets.breatheco.de/apis/sound/'
  let audioRef = useRef();
  const [playButton, setPlayButton] = useState(true);
  const [currentIndex, setCurrentIndex] = useState()

  useEffect(() => {
    getSong(config.URL_SONGS)
    return () => {
    }
  }, [])


  const getSong = (url, options = {
    method: 'GET', // 
    headers: {
      'Content-Type': 'application/json', // MIME
    }
  }) => {
    getFetch(url, options)
      .then((response) => {

        return response.json();
      })
      .then((response) => {

        setSong(response);

      })
  }
  const play = (url, i) => {
    setCurrentIndex(i);
    setPlayButton(false);
    audioRef.current.src = URL_ROOT + url;
    audioRef.current.play();
  }

  const handleButtonPlay = () => {
    setPlayButton(false);
    audioRef.current.play();
  }

  const handleButtonPause = () => {
    setPlayButton(true);
    audioRef.current.pause();
    console.log(playButton)
  }

  const handleButtonBackward = () => {
    if (currentIndex - 1 < 0) {
      audioRef.current.src = URL_ROOT + songs[songs.length - 1].url;
      audioRef.current.play();
      setCurrentIndex(songs.length - 1)
    }
    else {
      audioRef.current.src = URL_ROOT + songs[currentIndex - 1].url;
      audioRef.current.play();
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleButtonForward = () => {
    if (currentIndex + 1 >= songs.length) {
      audioRef.current.src = URL_ROOT + songs[0].url;
      audioRef.current.play();
      setCurrentIndex(0)
    }
    else {
      audioRef.current.src = URL_ROOT + songs[currentIndex + 1].url;
      audioRef.current.play();
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <audio ref={audioRef}>
            Your browser does not support the audio tag.
          </audio>
          {
            !!songs &&
              songs.length > 0 ?
              <ul>
                {
                  songs.map((songname, key) => {
                    return (

                      <li className="songItem" key={key} onClick={() => play(songname.url, key)}> {key + 1} {songname.name}</li>

                    )
                  })} </ul> :
              (
                <div className="col-md-12 text-center">
                  Loading...
                </div>
              )
          }
          <div className='btn-area fixed-bottom'>
            <Button fa={faBackward} onClick={handleButtonBackward} />
            {
              !playButton ?
                <Button fa={faPause} onClick={handleButtonPause} />
                :
                <Button fa={faPlay} onClick={handleButtonPlay} />
            }
            <Button fa={faForward} onClick={handleButtonForward} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
