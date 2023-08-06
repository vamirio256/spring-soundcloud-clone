import React, { useEffect, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import InteractButton from "../InteractButton";
import Waveform from "../waveform/Waveform";
import PlaylistTrackCard from "./PlaylistTrackCard";

const Playlist = ({ playlist }) => {
  const [track, setTrack] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const playing = useSelector((state) => state.playing);
  const dispatch = useDispatch();

  const playTrack = (track) => {
    dispatch({
      type: "PLAY_TRACK",
      track: track,
    });
    setTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = (track) => {
    dispatch({
      type: "PLAY_TRACK",
      track: track,
    });
    setIsPlaying(false);
  };

  useEffect(() => {
    setTrack(playlist.tracks[0]);
    setIsPlaying(false);
  }, [playlist]);

  useEffect(() => {
    if (!playing) {
      return;
    }
    if (playing.track.id === track.id && playing.isPlaying === true)
      setIsPlaying(true);
    else setIsPlaying(false);
  }, [playing]);

  return (
    <div>
      {track ? (
        <>
          <h1 className="text-xl mb-5">{playlist.name}</h1>

          <div className="flex flex-col justify-center items-center md:flex-row md:items-start">
            <img
              src={playlist.tracks[0].coverUrl}
              className="h-[160px] w-[160px] mr-4 mb-10"
            />
            <div className="w-full flex flex-col">
              <div className="mb-3 flex flex-row justify-between ">
                <div className="flex flex-row items-center">
                  {/* play button */}
                  {!isPlaying ? (
                    <BsFillPlayFill
                      className="text-4xl bg-[#f50] text-white rounded-full p-[5px] cursor-pointer"
                      onClick={() => playTrack(track)}
                    />
                  ) : (
                    <BsFillPauseFill
                      className="text-4xl bg-[#f50] text-white rounded-full p-[5px] cursor-pointer"
                      onClick={() => pauseTrack(track)}
                    />
                  )}
                  <div className="ml-3">
                    <h3 className="text-[#999] text-xs cursor-pointer">
                      {track.user.username}
                    </h3>
                    <h2 className="text-[14px] cursor-pointer">
                      {playlist.name}
                    </h2>
                  </div>
                </div>
                {/* <p>{playlist.</p> */}
              </div>

              {/* waveform */}
              <Waveform audioUrl={track.audioUrl} />

              {/* tracks in playlist */}
              <div className="border-[1px] border-solid mt-3 h-[100px] overflow-auto">
                {playlist.tracks.map((track, index) => (
                  <PlaylistTrackCard
                    key={index}
                    size={"small"}
                    track={track}
                    playTrack={playTrack}
                    setTrack={setTrack}
                    setIsPlaying={setIsPlaying}
                  />
                ))}
              </div>

              <InteractButton />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Playlist;
