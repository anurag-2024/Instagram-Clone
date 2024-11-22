import React from 'react'
import img01 from "../../assets/profileimages/img01.jpg";
import { GoHeart } from "react-icons/go";
import { useSelector } from 'react-redux';
import { getRelativeTime } from '../../utils/time';
const Comment = ({comment}) => {
    const username = useSelector((state) => state.username);
  return (
    <div className="flex p-2.5">
      <div className="flex-shrink-0">
        <img 
          src={comment.userId.profile || img01} 
          alt="" 
          className="w-8 h-8 rounded-full object-cover cursor-pointer"
        />
      </div>
      <div className="ml-3 flex-grow">
        <div className="flex flex-wrap gap-2">
          <span className="font-semibold text-sm cursor-pointer">
            {comment.userId.username}
          </span>
          <p className="text-sm">{comment.comment}</p>
        </div>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-xs text-gray-500">
            {getRelativeTime(comment.createdAt)}
          </span>
          <button className="text-xs text-gray-500 font-semibold">
            Reply
          </button>
        </div>
      </div>
      <div className="flex-shrink-0 ml-2">
        <GoHeart className="cursor-pointer" />
      </div>
    </div>
  )
}

export default Comment
