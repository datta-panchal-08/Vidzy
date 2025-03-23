import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div className="w-full flex mt-2">
    <Sidebar />
    <Outlet/>
    </div>
  )
}

export default Home