import React, { useState, useEffect } from 'react';
import { images } from '../Feed/images';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Carousel = () => {
  const username = useSelector((state) => state.username);
  const count = images.length;
  const navigate = useNavigate();
  const [seen, setSeen] = useState(JSON.parse(localStorage.getItem('seenState')) || Array(count).fill(false));
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleClick = (index) => {
    setSeen((prevSeen) => {
      const newSeen = [...prevSeen];
      newSeen[index] = true;
      return newSeen;
    });
    setClickedIndex(index);
  };

  useEffect(() => {
    if (clickedIndex !== null) {
      localStorage.setItem('seenState', JSON.stringify(seen));
      navigate(`/stories/${username}/${clickedIndex}`);
    }
  }, [seen, clickedIndex, navigate]);

  return (
    <>
      {images.map((img, index) => (
        <div key={index} className="flex-shrink-0 mr-2">
          <div className="flex flex-col items-center space-y-1">
            <button 
              className={`w-16 h-16 rounded-full p-[2px] cursor-pointer
                ${seen[index] 
                  ? 'bg-gray-200' 
                  : 'bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500'}`}
              onClick={() => handleClick(index)}
            >
              <div className="w-full h-full rounded-full p-[2px] bg-white">
                <img 
                  src={img} 
                  alt="" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </button>
            <span className="text-xs text-gray-600 truncate w-16 text-center">
              username{index + 1}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Carousel;
