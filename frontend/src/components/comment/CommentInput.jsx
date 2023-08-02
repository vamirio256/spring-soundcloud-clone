import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../apis/track/addComment";
import { BsFillSendFill } from "react-icons/bs";
import { getTrack } from "../../apis/track/getTrack";

const CommentInput = ({ className, trackId, setComments }) => {
  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.userReducer);

  const handleAddComment = async (e) => {
    await addComment(comment, trackId);
    const track = await getTrack(trackId);
    setComments(track.comments);
  };

  return (
    <div className={`${className} flex flex-row h-[40px]`}>
      <img src={user.avatarUrl} className="w-[40px] h-full" />
      <div className="bg-[#F2F2F2] w-full p-2 h-full flex flex-row item-center">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-solid rounded-md text-xs p-1 focus:outline-none"
          placeholder="Comment here"
        />
        <button onClick={handleAddComment}>
          <BsFillSendFill className="text-[#f50] ml-2 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default CommentInput;