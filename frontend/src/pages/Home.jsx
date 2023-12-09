import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import Feed from '../components/Feed/Feed'
import "../styles/Home.scss"
const Home = () => {
  return (
    <div className='homeContainer'>
      <Sidebar/>
      <Feed/>
    </div>
  )
}

export default Home
