import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate, useParams } from "react-router-dom/dist";
import { getUserData } from "../../apis/user/getUserData";
import EditButton from "../../components/buttons/EditButton";
import FollowButton from "../../components/buttons/FollowButton";
import MoreButton from "../../components/buttons/MoreButton";
import Avatar from "../../components/image/Avatar";
import SideBar from "../../components/side-bar/SideBar";
import TabNavigateBar from "./TabNavigateBar";
import PlaylistTab from "./tabs/PlaylistTab";
import TrackTab from "./tabs/TrackTab";

const UserPage = () => {
  const [user, setUser] = useState("");
  const { userId } = useParams();
  const [notfound, setNotfound] = useState(false);
  const avatarInputRef = useRef(null);
  let userReducer = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDataOnInitial = async () => {
      try {
        const response = await getUserData(userId);

        if (response.status == 404) {
          navigate("/not-found");
          return;
        }

        const userData = await response.json();
        setUser(userData);
      } catch (e) {
        console.error(e);
      }
    };
    getUserDataOnInitial();
  }, []);

  return (
    <>
      {user && (
        <div>
          <div>
            {/* header */}
            <div className="h-64 bg-gradient-to-tl from-[#A19793] to-[#827A60] p-7 flex flex-row items-center">
              <div className="group relative">
                <Avatar
                  src={user.avatarUrl}
                  className="rounded-full w-[200px] h-[200px]"
                />
                <div className="hidden group-hover:block absolute items-center justify-center w-full">
                  <label
                    htmlFor="file-input"
                    className="px-4 py-2 text-white rounded-md cursor-pointer"
                  >
                    Choose File
                  </label>
                  <input type="file" id="file-input" className="sr-only" />
                </div>
              </div>
              <h1 className="username text-xl text-white bg-black ml-5 cursor-text">
                {user.username}
              </h1>
            </div>
          </div>

          {/* navigate bar */}
          <div className="flex justify-between items-center px-8 py-2 border-b flex-wrap ">
            <TabNavigateBar userId={userId} />

            {/* interact button */}
            <div className="flex items-center">
              {userReducer.id !== userId && (
                <FollowButton
                  haveBorder={true}
                  haveText={true}
                  className={"mr-2"}
                />
              )}
              <MoreButton
                haveBorder={true}
                haveText={true}
                className={"mr-2"}
              />
              <EditButton haveBorder={true} haveText={true} />
            </div>
          </div>

          <div className="flex px-8 flex-col md:flex-row">
            {/* left section */}
            <div className="w-full md:w-[72%] md:border-r-[1px] md:border-solid pt-8 pr-8">
              <Routes>
                <Route index element={<TrackTab user={user} />} />
                <Route
                  path="/playlist"
                  element={
                    <PlaylistTab
                      playlists={user.profile.playlists}
                      user={user}
                    />
                  }
                />
              </Routes>
            </div>

            {/* right section */}
            <div className="w-full md:w-[28%] pl-8 pt-8 text-[#999] text-[14px]">
              <div className="mb-8">
                <div className="grid grid-cols-3">
                  <div className="border-r">
                    <p className="text-xs">Followers</p>
                    <p className="text-xl">0</p>
                  </div>
                  <div className="border-r ml-3">
                    <p className="text-xs">Following</p>
                    <p className="text-xl">
                      {Object.keys(user.profile.follows).length}
                    </p>
                  </div>
                  <div className="ml-3">
                    <p className="text-xs">Tracks</p>
                    <p className="text-xl">
                      {Object.keys(user.profile.tracks).length}
                    </p>
                  </div>
                </div>
              </div>

              <SideBar />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
