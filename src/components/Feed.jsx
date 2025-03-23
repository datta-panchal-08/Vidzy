import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'
import { useDispatch } from 'react-redux';

const Feed = () => {
    const { isSidebarVisible } = useDispatch(store => store.app);

    return (
        <div className={` px-1 ${isSidebarVisible === true ? "md:w-[83%]  overflow-x-hidden " : "w-full overflow-x-auto "}`}>
            <ButtonList />
            <VideoContainer />
        </div>
    )
}

export default Feed