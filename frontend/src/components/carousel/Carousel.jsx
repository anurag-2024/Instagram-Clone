import React from 'react'
import { images } from "../Feed/images"
const Carousel = () => {
    return (
        <>
            {images.map((img) => {
                return (
                    <div className='story'>
                        <div className='stories-img'>
                            <div className='story-circle'><img src={img} alt='' /></div>
                        </div>
                        <div className='stories-text'>
                            <p>username01</p>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Carousel
