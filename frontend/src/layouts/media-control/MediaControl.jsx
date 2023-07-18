import React, { useEffect, useRef, useState } from "react";
import {
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
  BsRepeat,
} from "react-icons/bs";
import image from "../../images/temp_track_cover.jfif";
import VolumeControl from "./VolumeControl";
import PlaybackTimeLine from "./PlaybackTimeLine";
import { formatDuration } from "../../utils/formatDuration";
import { useDispatch, useSelector } from "react-redux";

const MediaControl = () => {
  const audioRef = useRef(null);
  // const [isPLaying, setIsPlaying] = useState(false);

  // playing redux
  const dispatch = useDispatch();

  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const VOLUME_MAX = 100;

  const currentSong = useSelector((state) => state.currentSongReducer);

  const toggleAudio = () => {
    if (currentSong.isPlaying) {
      // audioRef.current?.pause();
      dispatch({
        type: "CHANGESONG",
        song: { ...currentSong, isPlaying: false },
      });
      // setIsPlaying(false);
    } else {
      // void audioRef.current?.play();
      dispatch({
        type: "CHANGESONG",
        song: { ...currentSong, isPlaying: true },
      });
      // setIsPlaying(true);
    }
  };

  const handleVolume = (e) => {
    const { value } = e.target;
    const volume = Number(value) / VOLUME_MAX;
    audioRef.current.volume = volume;
  };

  const handleTimeline = (e) => {
    const currentTimeLine = e.target.value;
    const time = (duration * currentTimeLine) / 100;
    audioRef.current.currentTime = time;
  };
  function onPlaying() {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    setCurrentTime(currentTime);
    setProgress((currentTime / duration) * 100);
  }
  useEffect(() => {
    if (!currentSong) {
      return;
    }
    const audioElement = audioRef.current;
    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (currentSong.isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
    return () => {
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [currentSong]);

  useEffect(() => {}, [currentSong]);

  const buttonStyle = "text-xl ml-3";
  // console.log(currentTime);

  return (
    currentSong && (
      <div className="sticky bottom-0 w-full z-10 bg-[#f2f2f2] border-[#ccc] border-t text-xs flex justify-center">
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          onTimeUpdate={onPlaying}
        />

        <div className="w-[1240px] flex flex-row justify-between items-center h-[48px]">
          {/* control button */}
          <div className="flex flex-row">
            <button>
              <BsFillSkipStartFill className={`${buttonStyle}`} />
            </button>
            {/* play btn */}
            <button onClick={toggleAudio}>
              {!currentSong.isPlaying ? (
                <BsFillPlayFill className={`${buttonStyle}`} />
              ) : (
                <BsFillPauseFill className={`${buttonStyle}`} />
              )}
            </button>
            <button>
              <BsFillSkipEndFill className={`${buttonStyle}`} />
            </button>
            <button>
              <BsShuffle
                className={`${buttonStyle}`}
                style={{ fontSize: "1.15rem" }}
              />
            </button>
            <button>
              <BsRepeat
                className={`${buttonStyle}`}
                style={{ fontSize: "1.15rem" }}
              />
            </button>
          </div>

          {/* track control */}
          <div className="flex justify-center items-center">
            {/* current time */}
            <p className="text-xs mr-4 text-[#f50]">
              {formatDuration(currentTime.toFixed(0))}
            </p>

            <PlaybackTimeLine
              progress={progress}
              handleTimeline={handleTimeline}
            />

            {/* total duration */}
            <p>{formatDuration(duration.toFixed(0))}</p>
          </div>
          {/* volume control */}
          <div className="">
            <VolumeControl
              VOLUME_MAX={VOLUME_MAX}
              handleVolume={handleVolume}
            />
          </div>
          <div className="flex flex-row">
            <img
              src={currentSong.coverUrl}
              className="h-[30px] w-[30px] mr-5"
            />
            <div>
              <p>{currentSong.title}</p>
              <p>{currentSong.artist}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MediaControl;
