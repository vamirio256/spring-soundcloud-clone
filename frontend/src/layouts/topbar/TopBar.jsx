import React, { useEffect, useMemo, useState } from "react";
import { BiLogoSoundcloud, BiMenuAltLeft } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import TopBarItem from "./TopBarItem";
import SearchBar from "./SearchBar";
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../../components/modals/ConfirmModal";
import NotificationDropDown from "../../components/drop-downs/NotificationDropDown";
import { AiOutlineClose } from "react-icons/ai";
import useScreenDimensions from "../../utils/useScreenDimensions";

const TopBar = () => {
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);
  const isDesktop = useScreenDimensions();
  const [openMenu, setOpenMenu] = useState(false);
  const [isTransition, setIsTransition] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  }, [isDesktop]);

  const openConfirmModal = () => {
    dispatch({
      type: "OPEN_MODAL_CONFIRM",
      onConfirm: logout,
      context:
        "Are you sure to logout right now? There are many tracks waiting you to discover.",
      title: "Logout",
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="sticky flex w-full justify-center items-center bg-[#333] text-sm top-0 z-10">
      <div className="max-w-[1240px] w-full">
        <div
          className={`bg-red h-12 flex items-center justify-between m-auto  `}
        >
          {/* menu icon mobile */}
          <BiMenuAltLeft
            size={40}
            color="white"
            onClick={() => setOpenMenu(true)}
            className="lg:hidden"
          />

          {/* topbar item menu */}
          <div
            className={`z-max container flex flex-col bg-topbar w-[300px] ${
              openMenu ? "ml-[0px]" : "ml-[-300px]"
            } absolute left-0 top-0 ease-in duration-300 h-[100vh] lg:flex-row lg:w-full lg:h-12 transition-[margin-left] lg:transition-none lg:relative`}
            // style={{
            //   height: screenWidth > 1023 ? "3rem" : "screenHeight",
            //   marginLeft: openMenu ? "0px" : "-300px",
            // }}
          >
            {/* close btn */}
            <div className="lg:hidden">
              <AiOutlineClose
                size={30}
                className="block ml-auto"
                color="white"
                onClick={() => setOpenMenu(false)}
              />
            </div>
            <TopBarItem
              setOpenMenu={setOpenMenu}
              icon={<BiLogoSoundcloud color="white" size={50} />}
              label={"Home"}
              to={"/home"}
            />
            <button
              onClick={() => {
                dispatch({ type: "APPEND_NOTIFICATION", icon: "warning" });
              }}
              className="w-full lg:w-auto"
            >
              <TopBarItem label={"Feed"} setOpenMenu={setOpenMenu} />
            </button>
            <TopBarItem
              label={"Library"}
              to={"/library"}
              setOpenMenu={setOpenMenu}
            />
            {/* search */}
            <SearchBar />
            {/* premium button */}
            <TopBarItem
              label={<span className="text-[#f50]">Premium</span>}
              setOpenMenu={setOpenMenu}
              to={"/premium"}
            />
            <TopBarItem
              label={"Upload"}
              to={"/upload"}
              setOpenMenu={setOpenMenu}
            />
          </div>
          {/* account infor */}
          <div className="relative flex lg:w-[300px]">
            <TopBarItem
              label={user.username}
              to={`/user/${user.id}`}
              icon={
                <img
                  src={user.avatarUrl}
                  className="rounded-full w-[20px] h-[20px]"
                />
              }
              classname={"w-full "}
            />
            <button onClick={openConfirmModal}>
              <IoLogOut color="white" size={30} />
            </button>
            {/* <div className="absolute bottom-[-70px] right-[20px] bg-white shadow-md p-2">
              <div>Account</div>
              <hr className="my-1" />
              <div> Logout</div>
            </div> */}
          </div>
          {/* notification button
          <NotificationDropDown /> */}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
