import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_KEY, BASE_URL, YOUTUBE_VIDEOS_URL } from '../constants/YoutubeAPI';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setVideo } from '../utils/AppSlice';

const VideoContainer = () => {
  const dispatch = useDispatch();
  const {video,category} = useSelector(store => store.app);

  const fetchVideos = async () => {
    try {
      let res = await axios.get(YOUTUBE_VIDEOS_URL, {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 50,
          type:"video",
          key: API_KEY,
        }
      });
      dispatch(setVideo(res?.data))
    } catch (error) {
      console.log(error);
    }
  }

  const fetchVideosByKeywords = async () =>{
    try {
      const res = await axios.get(`${BASE_URL}/search`,{
        params:{
          part:'snippet',
          maxResults:50,
          q:category,
          type: "video",
          key:API_KEY,
        }
      });
      dispatch(setVideo(res?.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(category === "All"){
      fetchVideos();
    }else{
      fetchVideosByKeywords();
    }
  }, [category])

  return (
    <div className='h-[calc(100vh-6.6rem)] px-1  overflow-y-scroll  grid  grid-cols-1 gap-4 items-baseline md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 '>
      {
        video?.items?.map((item) => {
          return <Link key={item.id.videoId || item.id}
          to={`watch?v=${item.id}`}>
            <VideoCard video={item} />
          </Link> 
        })
      }
    </div>
  )
}

export default VideoContainer