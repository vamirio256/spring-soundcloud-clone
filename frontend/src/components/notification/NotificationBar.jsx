import React, { useState, useEffect } from "react";
import { IoNotifications } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const NotificationBar = ({ children, message, className }) => {
  const notification = useSelector((state) => state.notificationReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (notification.isShowed) {
      const timeout = setTimeout(() => {
        dispatch({
          type: "CLOSE_NOTIFICATION",
        });
      }, 4500);

      return () => clearTimeout(timeout);
    }
  }, [notification.isShowed]);

  const hideNotification = () => {
    dispatch({
      type: "CLOSE_NOTIFICATION",
    });
  };

  return (
    <>
      {notification.isShowed && (
        <div
          className={`${className} notification-bar fixed h-fit w-[200px] overflow-hidden right-0 g-[#fff] p-3 rounded-md shadow-md border-[1px] border-solid cursor-pointer flex flex-col z-max bg-white m-auto bottom-[60px] left-0 right-0"
          }`}
          onClick={hideNotification}
        >
          <div className="flex flex-row items-center">
            <IoNotifications size={50} className="text-[#f50] mr-3" />
            {notification.text}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationBar;