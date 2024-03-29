// useScreenDimensions.js

import { useState, useEffect } from "react";

const screenSizeEvent = new Event("screenSizeChanged");

const useScreenDimensions = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      // setScreenHeight(window.innerHeight);
      window.dispatchEvent(screenSizeEvent);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (screenWidth > 1023) {
    return true;
  }
  return false;
};

export default useScreenDimensions;
