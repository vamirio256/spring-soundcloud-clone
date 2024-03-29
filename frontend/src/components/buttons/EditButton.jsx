import React from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";

const EditButton = ({ className, playlist }) => {
  const dispatch = useDispatch();

  return (
    <button
      className={`${className} border-[1px] border-solid px-2 py-1 text-xs rounded-sm bg-white hover:border-[#999] flex flex-row item-center mr-2`}
      onClick={() => {
        if (playlist)
          dispatch({ type: "OPEN_MODAL_EDIT_PLAYLIST", playlist: playlist });
        else {
          dispatch({ type: "OPEN_MODAL_EDIT_USER" });
        }
      }}
    >
      <MdEdit className="text-[14px]" />
      <span className="ml-1">Edit</span>
    </button>
  );
};

export default EditButton;
