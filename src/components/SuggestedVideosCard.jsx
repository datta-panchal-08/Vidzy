import moment from 'moment';
import React from 'react'

const SuggestedVideosCard = ({video}) => {    
  return (
    <div className='w-full flex items-center gap-2'>
       <div className="img-container w-[55%] overflow-hidden">
          <img className='w-full object-cover rounded-xl' src={video?.snippet?.thumbnails?.medium?.url} alt="" />
      </div>       
        <div className="details w-[45%]">
          <div className="upper-details flex flex-col gap-5">
            <p className='text-[0.9rem] font-semibold'>{video?.snippet?.description.slice(0,40)}...</p>
          </div>
           
           <div className="bottom-details flex items-center gap-1">
           <span className='text-[0.6rem] text-zinc-600 font-bold'>{video?.snippet?.channelTitle}</span>
            <div className="w-1 h-1 bg-gray-400"></div>
           <span className='text-[0.6rem] text-zinc-600 font-bold'>{moment(video?.snippet?.publishedAt).fromNow()}</span>
           </div>

        </div>
    </div>
  )
}

export default SuggestedVideosCard