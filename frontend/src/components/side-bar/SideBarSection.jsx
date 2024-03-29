import React from "react";
import { Link } from "react-router-dom";

const SideBarSection = ({ header, icon, children, sideButton }) => {
  return (
    <div className="mb-5">
      <div>
        <div className="flex flex-row items-center border-b mb-3 pb-2 justify-between">
          <div className="flex flex-row items-center">
            <span>{icon}</span>
            <span className="ml-2">{header}</span>
          </div>
          <div className="text-xs">{sideButton}</div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SideBarSection;
