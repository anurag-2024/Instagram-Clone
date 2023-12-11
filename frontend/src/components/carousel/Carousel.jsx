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
      {images.map((img, index) => {
        return (
          <div className='story'>
            <div className='stories-img'>
              <div
                className={`story-circle ${seen[index] ? 'borderColor-white' : ''}`}
                onClick={() => handleClick(index)}
              >
                <img src={img} alt='' />
              </div>
            </div>
            <div className='stories-text'>
              <p>username01</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Carousel;
