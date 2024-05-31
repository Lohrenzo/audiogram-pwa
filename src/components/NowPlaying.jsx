import { useState, useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeHigh,
  FaVolumeOff,
  FaVolumeLow,
  FaVolumeXmark,
} from "react-icons/fa6";
import { RiArrowRightDoubleFill, RiArrowLeftDoubleFill } from "react-icons/ri";

// Zustand
import { useSongStore } from "../store/store";

const NowPlaying = () => {
  const {
    isPlaying,
    setIsPlaying,
    currentSong,
    playlist,
    setPlaylist,
    songs,
    index,
    setIndex,
    setCurrentSong,
  } = useSongStore();
  const songRef = useRef(null); // Create a ref for the audio player
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [timer, setTimer] = useState(null);
  const [clickStartTime, setClickStartTime] = useState(0);

  const togglePause = () => {
    if (songRef.current) {
      songRef.current.pause();
      setIsPlaying(false);
      console.log("Paused");
    }
  };

  const togglePlay = () => {
    if (songRef.current) {
      songRef.current.play();
      setIsPlaying(true);
      console.log("Played");
    }
  };

  const handlePrevious = () => {
    if (songRef.current.currentTime > 5) {
      songRef.current.currentTime = 0;
    } else {
      if (index > 0) {
        setIndex(index - 1);
      } else {
        setIndex(playlist.length - 1);
      }
      console.log("previous");
      togglePause();
    }
  };

  const handleNext = () => {
    if (index < playlist.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
    togglePause();
    console.log("next");
  };

  const fastForward = () => {
    if (songRef.current) {
      songRef.current.currentTime += 5;
      console.log("fast forwarded");
    }
  };

  const handleMouseDown = () => {
    setClickStartTime(new Date().getTime());
    setTimer(
      setTimeout(() => {
        fastForward();
        setTimer(setInterval(fastForward, 1000));
      }, 600)
    );
  };

  const handleMouseUp = () => {
    const clickEndTime = new Date().getTime();
    clearTimeout(timer);
    clearInterval(timer);
    if (clickEndTime - clickStartTime < 500) {
      handleNext();
    } else {
      if (timer) {
        setTimer(null);
        if (songRef.current.currentTime + 5 >= duration) {
          handleNext();
        }
      }
    }
    console.log(`${clickEndTime - clickStartTime}`);
    console.log("clickStart: ", clickStartTime);
    console.log("clickEnd: ", clickEndTime);
  };

  useEffect(() => {
    setPlaylist([...songs]);
    console.log("Playlist: ", playlist);
  }, [songs]);

  useEffect(() => {
    setCurrentSong(songs[index]);
    console.log(currentSong?.title);
    if (songRef.current) {
      songRef.current.src = songs[index]?.audio || "";
      if (isPlaying) {
        songRef.current.play();
      }
    }
  }, [index]);

  const playPause = () => {
    if (isPlaying) {
      togglePause();
    } else {
      togglePlay();
    }
  };

  const muteUnmute = () => {
    if (songRef.current) {
      if (songRef.current.volume === 0) {
        setVolume(0.5);
        // songRef.current.volume = volume;
      } else {
        setVolume(0);
        // songRef.current.volume = volume;
      }
    }
  };

  const volumeSlider = (event) => {
    const newVolume = event.target.value / 100;
    setVolume(newVolume);
    if (songRef.current) {
      songRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    if (songRef.current) {
      songRef.current.volume = volume;
    }
  }, [volume]);

  const setVolumeIcon = () => {
    if (volume === 0) {
      return <FaVolumeXmark />;
    } else if (volume < 0.5) {
      return <FaVolumeLow />;
    } else {
      return <FaVolumeHigh />;
    }
  };

  useEffect(() => {
    const audioElement = songRef?.current;

    const updateCurrentTime = () => {
      setCurrentTime(audioElement.currentTime);
    };

    const updateDuration = () => {
      setDuration(audioElement.duration);
    };

    if (audioElement) {
      audioElement.addEventListener("timeupdate", updateCurrentTime);
      audioElement.addEventListener("loadedmetadata", updateDuration);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("timeupdate", updateCurrentTime);
        audioElement.removeEventListener("loadedmetadata", updateDuration);
      }
    };
  }, []);

  const handleTimeSliderChange = (event) => {
    const newTime = (event.target.value / 100) * duration;
    if (songRef.current) {
      songRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[100px] z-10 bg-[#27263F] text-[#ffffff] backdrop-blur-lg shadow-xl px-9 grid grid-cols-5 gap-8 items-center justify-between">
      <div className="flex items-center justify-between gap-4 col-span-2">
        <div className="flex items-center gap-4 overflow-hidden">
          <img
            src={
              currentSong?.cover ||
              "https://placehold.co/800?text=Hello+World&font=roboto"
            }
            alt="logo"
            className="object-cover w-16 h-16 border border-black/10 rounded-md"
          />
          <div>
            <h1 className="text-xl font-bold">
              {!currentSong ? "Title" : currentSong?.title}
            </h1>
            <p className="text-md font-bold">
              {!currentSong ? "Artist" : currentSong?.artist}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-2xl">
          {currentSong && (
            <audio src={currentSong?.audio} ref={songRef}></audio>
          )}
          <div
            style={{ width: "40px", height: "40px" }}
            onClick={handlePrevious}
            className="flex items-center justify-center font-bold hover:scale-110 active:scale-100 border border-black/15 hover:shadow-md p-1 rounded-l-full rounded-r-xl transition-all duration-200"
          >
            <RiArrowLeftDoubleFill />
          </div>
          <div
            style={{ width: "40px", height: "40px" }}
            onClick={playPause}
            className="flex items-center justify-center font-bold hover:scale-110 active:scale-90 transition-all duration-300"
          >
            {isPlaying ? (
              <FaPause style={{ fontSize: "100px" }} />
            ) : (
              <FaPlay style={{ fontSize: "100px" }} />
            )}
          </div>
          <div
            style={{ width: "40px", height: "40px" }}
            // onClick={handleNext}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="flex items-center justify-center font-bold hover:scale-110 active:scale-100 border border-black/15 hover:shadow-md p-1 rounded-r-full rounded-l-md transition-all duration-200"
          >
            <RiArrowRightDoubleFill />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 col-span-2">
        <p className="text-md font-bold">{formatTime(currentTime) || "0:00"}</p>
        <input
          className="w-[100%]"
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleTimeSliderChange}
        />
        <p className="text-md font-bold">{formatTime(duration) || "0:00"}</p>
      </div>
      <div className="flex items-center justify-end w-fit gap-4">
        <button
          className="rounded-lg shadow-lg bg-transparent hover:scale-110 transition-all duration-300 active:scale-90 border border-black/15 p-2 text-md font-bold"
          onClick={muteUnmute}
        >
          {setVolumeIcon()}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={volumeSlider}
        />
      </div>
    </div>
  );
};

export default NowPlaying;
