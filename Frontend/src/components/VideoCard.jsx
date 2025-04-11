import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_KEY, BASE_URL } from '../constants/YoutubeAPI';
import Avatar from 'react-avatar';
import moment from 'moment';
import { useSelector } from 'react-redux';
const VideoCard = ({ video }) => {
  const [ytIcon, setYtIcon] = useState();
  const [views, setViews] = useState();
  const { snippet } = video
  const {isDarkMode} = useSelector((store)=>store.app);
  const formatViews = (num) => {
    if (num >= Math.pow(10, 9)) return (num / Math.pow(10, 9)).toFixed(1) + "B";
    if (num >= Math.pow(10, 6)) return (num / Math.pow(10, 6)).toFixed(1) + "M";
    if (num >= Math.pow(10, 3)) return (num / Math.pow(10, 3)).toFixed(1) + "K";
    return num?.toString();
  };

  const getViewsByVideoId = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/videos`, {
        params: {
          part: "snippet,statistics",
          key: API_KEY,
          id: video.id.videoId || video.id
        }
      })
      setViews(res?.data?.items[0]?.statistics?.viewCount);
    } catch (error) {
      console.log(error);
    }
  }

  const getChannelProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/channels`, {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: snippet.channelId,
          key: API_KEY,
        }
      });
      setYtIcon(res?.data?.items[0]?.snippet?.thumbnails?.medium?.url);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getChannelProfile();
    getViewsByVideoId();
  }, [])

  return (
    <div className='w-[100%] cursor-pointer duration-300 rounded-lg'>
      <div className="img-container w-full">
        <img className='rounded-lg w-full object-cover aspect-video' src={snippet?.thumbnails?.medium?.url} alt="" />
      </div>
      <div className="content-and-profile mt-2 w-full flex  gap-3">
        <div className="profile ">
          <Avatar src={ytIcon} size='2rem' round={true} />
        </div>
        <div className="channel-data">
          <h3 className='text-[1rem] font-bold'>{snippet?.title.slice(0, 30)}...</h3>
          <h4 className={`text-[0.9rem] ${isDarkMode ? "":"text-zinc-800 "} font-[400]`}>{snippet?.channelTitle}</h4>
          <div className='flex items-center gap-1'>
            <h4 className={`text-[0.8rem] ${isDarkMode ? "":"text-zinc-700"} font-[400]`}>{formatViews(views)} views</h4>
            <div className={`w-[0.2rem] h-[0.2rem] ${isDarkMode ? "bg-zinc-100":"bg-zinc-500"} rounded-lg`}></div>
            <h4 className={`text-[0.8rem]${isDarkMode ? "":" text-zinc-700"} font-[400]`}>{moment(snippet?.publishedAt).fromNow()}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCard