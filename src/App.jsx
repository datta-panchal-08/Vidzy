import React, { Children, useState } from 'react'
import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Watch from './components/Watch';
import Feed from './components/Feed';
import SearchedVideo from './components/SearchedVideo';
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
  {
    path:"/search",
    element:<SearchedVideo/>
  }

])

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div className='relative w-full   '>
      <Navbar setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />
      <RouterProvider router={appRouter}>
        {Children}
      </RouterProvider>
    </div>
  )
}

export default App