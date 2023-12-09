import React from 'react';
import "./Suggesstion.scss";
import img01 from '../../assets/profileimages/img01.jpg';
import { useNavigate } from 'react-router-dom';
const Suggesstion = (props) => {
  const navigate=useNavigate();
  const maxSentenceLength = 28;
  const sentence = `Followed by ${props.name} +76 more..`;
  return (
    <div className='suggestion'>
      <div className='feed-right-suggesstion-list-img' onClick={()=>navigate(`${props.username}`)}>
        <img src={props.img} alt='' />
      </div>
      <div className='suggesstion-box'>
        <div className='feed-right-suggesstion-list-username' onClick={()=>navigate(`${props.username}`)}>
          <p>{props.username}</p>
        </div>
        <div className='feed-right-suggesstion-list-followedby'>
          <p>{sentence.slice(0, maxSentenceLength)}{sentence.length > maxSentenceLength ? '...' : ''}</p>
        </div>
      </div>
      <div className='feed-right-suggesstion-list-follow'>
        <p>Follow</p>
      </div>
    </div>
  )
}
export default Suggesstion;
