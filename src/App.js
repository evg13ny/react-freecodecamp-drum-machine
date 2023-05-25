import { useEffect, useState } from 'react';
import './App.css';

const clips = [
  {
    keyCode: 81,
    keyText: 'Q',
    clipDesc: 'Heater 1',
    clipURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyText: 'W',
    clipDesc: 'Heater 2',
    clipURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyText: 'E',
    clipDesc: 'Heater 3',
    clipURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyText: 'A',
    clipDesc: 'Heater 4',
    clipURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyText: 'S',
    clipDesc: 'Clap',
    clipURL: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyText: 'D',
    clipDesc: 'Open-HH',
    clipURL: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyText: 'Z',
    clipDesc: "Kick-n'-Hat",
    clipURL: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyText: 'X',
    clipDesc: 'Kick',
    clipURL: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyText: 'C',
    clipDesc: 'Closed-HH',
    clipURL: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function Pad({ clip, volume, setClipName }) {
  const [activeKey, setActiveKey] = useState(false);

  const playSound = () => {
    const sound = document.getElementById(clip.keyText);
    sound.volume = volume;
    sound.currentTime = 0;

    const playPromise = sound.play();
    if (playPromise !== undefined) playPromise.catch(function () { });

    setClipName(clip.clipDesc);

    setActiveKey(true);
    setTimeout(() => setActiveKey(false), 200);
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
    <button onClick={playSound} className={`drum-pad ${activeKey && 'active'}`} id={clip.clipDesc}>
      <audio className='clip' id={clip.keyText} src={clip.clipURL} />
      {clip.keyText}
    </button>
  );
}

function App() {
  const [volume, setVolume] = useState(0.3);
  const [clipName, setClipName] = useState('');

  return (
    <div className="App">
      <div id='drum-machine'>
        <div className='drumPad'>
          {clips.map((clip) => (
            <Pad key={clip.keyText} clip={clip} volume={volume} setClipName={setClipName} />
          ))}
        </div>

        <div id='display'>
          <div className='display'>{clipName}</div>

          <input type='range' className='volume' step='0.01' value={volume} max='1' min='0' onChange={(e) => setVolume(e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export default App;