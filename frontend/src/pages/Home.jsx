import React from 'react'
import Banner from '../components/Banner'
import MemberInfo from '../components/MemberInfo'
import Dashboard from '../components/Dashboard'
import GymGrowth from '../components/GymGrowth'
import Advertisement from '../components/Advertisement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
       <Navbar />
    <div className='lg:px-32 px-2'>
      <Banner/>
      <MemberInfo/>
      <Dashboard/>
      <GymGrowth/>
      <Advertisement/>
  
      
    </div>
    </div>
  )
}

export default Home