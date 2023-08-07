import React, { useEffect, useState } from "react";
import { getLatestTracks } from "../../apis/playlist/getLatestTracks";
import { getPopularTracks } from "../../apis/playlist/getPopularTracks";
import Playlist from "../../components/playlist/Playlist";
import SideBar from "../../components/side-bar/SideBar";
import HomePageTrackHorizontalSwipe from "../../components/track/TrackSwiper";
import loading_gif from "../../assets/images/loading-gif.gif";

const HomePage = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [popularTracks, setPopularTrack] = useState(null);
  const [latestTracks, setLatestTracks] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleIsPlaying = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularTracks = await getPopularTracks();
        const latestTracks = await getLatestTracks();
        setPopularTrack(popularTracks);
        setLatestTracks(latestTracks);
      } catch (error) {
        console.error(
          "An error occurred while retrieving the playlist:",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex pl-8 pr-8 flex-col md:flex-row">
      {/* home leftside */}
      <div className="w-full md:w-[72%] md:border-r-[1px] md:border-solid pt-8 pr-8">
        {latestTracks && popularTracks ? (
          <>
            <HomePageTrackHorizontalSwipe playlist={latestTracks} />
            <Playlist playlist={popularTracks} />
          </>
        ) : (
          <img
            src={loading_gif}
            className="w-[50px] h-[50px] left-0 right-0 m-auto top-10"
          />
        )}
      </div>
      {/* sidebar */}
      <div className="w-full md:w-[28%] pl-8 pt-8 text-[#999] text-[14px]">
        <SideBar recommendSection={true}/>
      </div>
    </div>
  );
};
export default HomePage;
