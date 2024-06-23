import React, { useEffect } from "react";
import { FaReact } from "react-icons/fa";
import "./Drumkit.css";
import basedrum from "./basedrum.mp3";
import crash from "./crash.mp3";
import floortom from "./floortom.mp3";
import hightom from "./hightom.mp3";
import hithat from "./hithat.mp3";
import ride from "./ride.mp3";
import snaredrum from "./snaredrum.mp3";
import maracas from "./maracas.wav"

function DrumKeys({ keyLabel, playSound, handleFlashing }) {
  return (
    <button
      className={`${keyLabel} btn`}
      onClick={() => {
        playSound(keyLabel);
        handleFlashing(keyLabel);
      }}
    >
      {keyLabel}
    </button>
  );
}

function Drumkit() {
  const DRUM_KEYS = ["w", "a", "s", "d", "j", "i", "k", "l"];

  const playSound = (key) => {
    let audioSrc;
    switch (key) {
      case 'w':
        audioSrc = ride;
        break;
      case 'a':
        audioSrc = floortom;
        break;
      case 's':
        audioSrc = basedrum;
        break;
      case 'd':
        audioSrc = hightom;
        break;
      case 'j':
        audioSrc = snaredrum;
        break;
      case 'i':
        audioSrc = maracas;
        break;
      case 'k':
        audioSrc = crash;
        break;
      case 'l':
        audioSrc = hithat;
        break;
      default:
        console.log("Wrong Key Pressed!");
        return;
    }
    var audio = new Audio(audioSrc);
    audio.play();
  };

  const handleFlashing = (key) => {
    const button = document.querySelector(`.${key}`);
    if (button) {
      button.classList.add("pressed");
      setTimeout(() => {
        button.classList.remove("pressed");
      }, 100);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (DRUM_KEYS.includes(key)) {
        playSound(key);
        handleFlashing(key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="container">
      <h1 className="heading text-white text-6xl m-10">Drumkit</h1>
      <div className="drum-keys">
        {DRUM_KEYS.map((key) => (
          <DrumKeys
            key={key}
            keyLabel={key}
            playSound={playSound}
            handleFlashing={handleFlashing}
          />
        ))}
      </div>
      <footer>
        <p>Made with <span><FaReact /></span> by Mrityunjay</p>
      </footer>
    </div>
  );
}

export default Drumkit;
