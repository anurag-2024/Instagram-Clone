import React from 'react'
import "../styles/Story.scss"
import { RxCross2 } from "react-icons/rx"
import { useNavigate } from 'react-router-dom'
const Story = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='blur-background'></div>
            <div className='insta'>
                <span onClick={() => navigate("/")}>Instagram</span>
            </div>
            <div className='cross-container' onClick={() => navigate("/")}>
                <RxCross2 className='cross' />
            </div>

            <div className='story-container'>
                
            </div>
        </>
    )
}

export default Story
