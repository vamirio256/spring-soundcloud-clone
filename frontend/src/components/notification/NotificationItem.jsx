import React, { useEffect, useRef, useState } from "react";
import { BiBell } from "react-icons/bi";
import { BsCheckLg } from "react-icons/bs";
import { FaBell, FaExclamation } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { PiWarningDiamondFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

export default function NotificationItem({ item, index }) {
  const [opacity, setOpacity] = useState(false);

  const ref = useRef(null);

  function hideElement() {
    setOpacity(false);
    setTimeout(() => {
      if (ref.current) {
        ref.current.style.display = "none";
      }
    }, 500);
  }

  useEffect(() => {
    setOpacity(true);
    setTimeout(() => {
      hideElement();
    }, 5000);
  }, []);

  const renderIcon = () => {
    switch (item.icon) {
      case "success":
        return (
          <div className="w-[40px] h-[40px] bg-[#00CC83] rounded-l-[3px] flex justify-center">
            <BsCheckLg className="text-[25px] text-white drop-shadow-md m-auto" />
          </div>
        );
      case "warning":
        return (
          <div className="w-[40px] h-[40px] bg-[#25A9EF] rounded-l-[3px] flex justify-center items-center">
            <FaExclamation className="text-[20px] text-white" />
          </div>
        );
      case "error":
        return (
          <div className="w-[40px] h-[40px] bg-[#E16744]">
            <BsCheckLg className="text-[40px] text-white" />
          </div>
        );
      default:
        return (
          !item.image && (
            <div className="w-[40px] h-[40px] flex justify-center items-center">
              <FaBell className="text-[30px] text-primary" />
            </div>
          )
        );
    }
  };

  return (
    // <div
    //   className={`mt-2 w-[200px] overflow-hidden g-[#fff] p-3 rounded-md shadow-md border-[1px] border-solid cursor-pointer flex flex-col z-max bg-white right-5 transition-opacity duration-500 ease-in-out relative group`}
    <div
      className={`rounded-[3px] drop-shadow-md bg-white mb-4 relative group cursor-pointer flex h-fit transition-opacity duration-500 ease-in-out w-[280px]`}
      onClick={hideElement}
      style={{ opacity: opacity ? 1 : 0 }}
      ref={ref}
    >
      {item.image && (
        <img src={item.image} alt="" className="w-[40px] h-[40px]" />
      )}
      {renderIcon()}
      <div className="flex h-full flex-col justify-start ml-3 m-auto">
        {item.name && <p className="font-normal truncate">{item.name}</p>}
        {item.text && <p className="text-xs">{item.text}</p>}
      </div>
    </div>
  );
}
