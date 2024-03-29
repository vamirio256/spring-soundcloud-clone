import React from "react";
import { Link } from "react-router-dom";

const Comment = ({ className, comment }) => {
  return (
    <>
      {comment && (
        <div className="w-full flex flex-row mt-4">
          <img
            src={comment.user.avatarUrl}
            className="w-[40px] h-[40px] mr-4 rounded-full"
            alt="user avatar"
          />
          <div className="text-xs flex flex-col justify-between py-0.5">
            <Link
              to={`/user/${comment.user.id}`}
              className="username text-gray-400"
            >
              {comment.user.username}
            </Link>
            <p className="">{comment.context}</p>
          </div>
        </div>
      )}
    </>
  );
};
export default Comment;
