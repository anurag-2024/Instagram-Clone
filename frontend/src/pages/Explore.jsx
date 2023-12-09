import React from 'react'
import "../styles/Explore.scss"
import { cards } from "../components/Feed/images"
import Sidebar from '../components/Sidebar/Sidebar'
const Explore = () => {
    return (
        <> <div className='page'>
            <Sidebar />
            <div className="explore">
                <div className="exploreWrapper">
                    <div className="exploreGrid">
                        {cards.map((card) => {
                            return (
                                <div className="exploreGridItem">
                                    <img src={card} alt="explore" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Explore
