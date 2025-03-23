import React, { Children, useState } from 'react'
import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Watch from './components/Watch';
import Feed from './components/Feed';
import SearchedVideo from './components/SearchedVideo';
import { useSelector } from 'react-redux';
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "",
        element: <Feed />
      },
      {
        path: "watch",
        element: <Watch />
      },
      
    ]
  },
])

const App = () => {
  const {isDarkMode} = useSelector((store)=>store.app);
  return (
    <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen transition-colors duration-300`}>
      <Navbar  />
      <RouterProvider router={appRouter}>
        {Children}
      </RouterProvider>
    </div>
  )
}

export default App