import React from 'react';
import { useNavigate } from 'react-router-dom';

const Suggestion = (props) => {
  const navigate = useNavigate();
  const maxSentenceLength = 28;
  const sentence = `Followed by ${props.name} +76 more..`;

  return (
    <div className="w-full flex items-center justify-between py-2">
      <div 
        className="w-12 h-12 cursor-pointer" 
        // onClick={() => navigate(`/user/${props._id}`)}
      >
        <img 
          src={props.img} 
          alt="" 
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      <div className="flex-grow mx-4">
        <div 
          className="cursor-pointer" 
          // onClick={() => navigate(`/user/${props._id}`)}
        >
          <p className="text-base font-semibold">{props.username}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">
            {sentence.slice(0, maxSentenceLength)}
            {sentence.length > maxSentenceLength ? '...' : ''}
          </p>
        </div>
      </div>

      <div className="mr-4">
        <p className="text-sm font-semibold text-[#0095F6] cursor-pointer">
          Follow
        </p>
      </div>
    </div>
  );
};

export default Suggestion;
