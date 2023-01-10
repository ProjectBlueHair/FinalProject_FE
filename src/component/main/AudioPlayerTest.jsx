import React, { useRef, useState } from "react";

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleVolumeChange = (event) => {
    // audioRef.current.volume = event.target.value;

    setVolume(event.target.value);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    audioRef.current.src = url;
  };
  return (
    <div>
      <input type="file" accept="audio/wav" onChange={handleFileChange} />
      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        volume={volume}
      />
      <div>
        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={() => (audioRef.current.currentTime -= 30)}>
          Skip Previous
        </button>
        <button onClick={() => (audioRef.current.currentTime += 30)}>
          Skip Next
        </button>
      </div>
      <div>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
      <div>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={(event) =>
            (audioRef.current.currentTime = event.target.value)
          }
          style={{
            "--placeholder-color": "lightgray",
            "--progress-color": "red",
            "--downloading-color": "gray",
          }}
        />
      </div>
      <div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={volume}
          onChange={handleVolumeChange}
          style={{
            "--placeholder-color": "lightgray",
            "--progress-color": "red",
            "--downloading-color": "gray",
          }}
        />
      </div>
    </div>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default AudioPlayer;
