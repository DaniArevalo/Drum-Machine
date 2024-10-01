import React, { useState, useEffect } from 'react';
import './App.css';

const sounds = [
  { key: 'Q', id: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', id: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', id: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', id: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', id: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', id: 'Kick-n-Hat', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' },
];

function App() {
  const [display, setDisplay] = useState('');
  const [power, setPower] = useState(true);
  const [bank, setBank] = useState(false);

  const playSound = (key, id) => {
    if (power) {
      const audio = document.getElementById(key);
      audio.play();
      setDisplay(id);
    }
  };

  const handleKeyPress = (event) => {
    const sound = sounds.find((sound) => sound.key === event.key.toUpperCase());
    if (sound) {
      playSound(sound.key, sound.id);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]); // Agregamos handleKeyPress como dependencia

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div className="pad-container">
        {sounds.map((sound) => (
          <div
            key={sound.key}
            id={sound.id}
            className="drum-pad"
            onClick={() => playSound(sound.key, sound.id)}
          >
            {sound.key}
            <audio className="clip" id={sound.key} src={sound.url}></audio>
          </div>
        ))}
      </div>
      <div className="controls">
        <div className="power">
          <span>Power</span>
          <input type="checkbox" checked={power} onChange={() => setPower(!power)} />
        </div>
        <div className="bank">
          <span>Bank</span>
          <input type="checkbox" checked={bank} onChange={() => setBank(!bank)} />
        </div>
      </div>
    </div>
  );
}

export default App;

