import { useEffect, useState } from 'react';
import './App.css';

const audioClips = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater 1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater 2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater 3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater 4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function Pad({ clip, volume, setRecording }) {
  const [active, setActive] = useState(false);

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();

    setRecording(clip.id);

    setActive(true);
    setTimeout(() => setActive(false), 200);
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  return (
    <button onClick={playSound} className={`${active && 'test'}`}>
      <audio className='clip' id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </button>
  );
}

function App() {
  const [volume, setVolume] = useState(0.3);
  const [recording, setRecording] = useState('');

  return (
    <div className="App">
      <div className='container'>
        <div className='pad'>
          {audioClips.map((clip) => (
            <Pad key={clip.id} clip={clip} volume={volume} setRecording={setRecording} />
          ))}
        </div>

        <div className='display'>
          <input type='range' step='0.01' value={volume} max='1' min='0' onChange={(e) => setVolume(e.target.value)} />

          <div>{recording}</div>
        </div>
      </div>
    </div>
  );
}

export default App;