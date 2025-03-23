import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { API_KEY, BASE_URL } from '../constants/YoutubeAPI';
import Avatar from 'react-avatar';
import { BiDislike, BiLike } from 'react-icons/bi';
import { PiShareFat } from 'react-icons/pi';
import moment from 'moment';
import SuggestedVideosCard from './SuggestedVideosCard';
import { IoIosArrowDown } from 'react-icons/io';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';

const Watch = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');
  console.log(videoId);
  
  const [videodetails, setVideoDetails] = useState();
  const [ytIcon, setYtIcon] = useState();
  const [liked, setLiked] = useState(false);
  const [more, setMore] = useState(false);
  const [suggested, setSuggested] = useState([]);
  const [comments, setComments] = useState();
  const [showComments, setShowComments] = useState(true);
  const {isDarkMode} = useSelector(store=>store.app);

  const getVideoById = async () => {
    try {
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          part: "snippet,statistics",
          key: API_KEY,
          id: videoId
        }
      });
      setVideoDetails(res.data.items[0]);
    } catch (error) {
      console.error("Error fetching video:", error.response?.data || error.message);
    }
  };


  const getChannelProfile = async () => {
    if (!videodetails?.snippet?.channelId) return;
    try {
      const res = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
        params: {
          part: "snippet,statistics",
          id: videodetails.snippet.channelId,
          key: API_KEY
        }
      });
      setYtIcon(res.data);
    } catch (error) {
      console.error("Error fetching channel details:", error.response?.data || error.message);
    }
  };

  const formatSubscribers = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num?.toString();
  };

  const getVideosByCategoryId = async () => {
    try {
      if (!videodetails?.snippet?.categoryId) return;
      const res = await axios.get(`${BASE_URL}/search`, {
        params: {
          part: "snippet",
          maxResults: 3,
          type: "video",
          videoCategoryId: videodetails?.snippet?.categoryId,
          key: API_KEY
        }
      })
      setSuggested(res?.data?.items);
    } catch (error) {
      console.log(error);

    }
  }

  const getCommentsByVideo = async () => {
    if (!videoId) return;
    try {
      const res = await axios.get(`${BASE_URL}/commentThreads`, {
        params: {
          part: "snippet",
          videoId: videoId, 
          key: API_KEY,
          maxResults: 50,
        },
      });
      setComments(res.data.items);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };
  
  useEffect(() => {
    getVideoById();
    if (videoId) getCommentsByVideo();
  }, [videoId]);

  useEffect(() => {
    if (videodetails) {
      getChannelProfile();
      getVideosByCategoryId();
    }
  }, [videodetails]);


  return (

    <div className='watch-page w-screen h-[calc(100vh-6.42rem)] overflow-x-hidden overflow-y-scroll px-2 md:px-5 grid gap-3 grid-cols-1 md:grid-cols-[65%_35%]'>
      {/* Video Section */}
      <div className="video-section">
        <iframe
          className='w-full h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] rounded-md'
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>

        <h3 className='text-lg font-bold mt-3'>
          {videodetails?.snippet?.title}
        </h3>

        {/* Channel Details */}
        <div className="channel-details flex flex-wrap items-center justify-between gap-3 mt-3">
          <div className="flex items-center gap-3">
            <Avatar src={ytIcon?.items[0]?.snippet?.thumbnails?.medium?.url} size='40' round />
            <div>
              <h3 className='text-sm font-semibold'>{videodetails?.snippet?.channelTitle}</h3>
              <h4 className='text-xs text-gray-600'>{formatSubscribers(ytIcon?.items[0]?.statistics?.subscriberCount)} subscribers</h4>
            </div>
            <button className='px-4 py-2 bg-black hover:bg-zinc-900 text-white rounded-full text-sm'>Subscribe</button>
          </div>

          {/* Like & Share Buttons */}
          <div className="flex gap-3 items-center flex-wrap">
            <div className={`flex items-center ${isDarkMode ? "bg-gray-500":"bg-gray-200 "} rounded-full px-4 py-2`}>
              <BiLike
                className={`cursor-pointer ${liked ? "text-red-500" : ""}`}
                onClick={() => setLiked(!liked)}
                size="1.2rem"
              />
              <h4 className='text-xs mx-2'>{formatSubscribers(videodetails?.statistics?.likeCount)}</h4>
              <div className="border-l border-gray-400 h-5 mx-2"></div>
              <BiDislike className="cursor-pointer" size="1.2rem" />
            </div>

            <button className={`flex items-center gap-2 px-4 py-2 ${isDarkMode ? "bg-gray-500":"bg-gray-200"} rounded-full text-sm`}>
              <PiShareFat />
              Share
            </button>
          </div>
        </div>

        {/* Channel Description */}
        <div className='description w-full my-3 bg-gray-200 px-1 h-fit py-1 rounded-lg '>
          <div className="view-and-time-and-tags flex flex-wrap items-center ">
            <span className='text-[0.9rem] font-semibold mr-2'>{formatSubscribers(videodetails?.statistics?.viewCount)} views</span>
            <span className='text-[0.9rem] font-semibold mr-2'>{moment(videodetails?.snippet?.publishedAt).format('MMMM DD, YYYY')}</span>
            {
              videodetails?.snippet?.tags?.map((item, i) => (
                <span key={i} className='text-blue-600 mr-3 text-[0.71rem]  font-semibold'>#{item}</span>
              ))
            }
            <p className='w-full text-[0.8rem] text-gray-800 font-semibold'>
              {
                more === false ? videodetails?.snippet?.description.slice(0, 100) : videodetails?.snippet?.description
              }
              {
                more === false ? <span className='text-zinc-700 font-semibold cursor-pointer' onClick={() => setMore(true)} > ...show more</span> : <span className='text-zinc-700 font-semibold cursor-pointer' onClick={() => setMore(false)} > ...show less</span>
              }
            </p>
          </div>
        </div>

        {/* Video Comments */}
        <div className="comments w-full mt-5 mb-5">

          <div className="comments-lenght flex items-center gap-1">
            {
              showComments === true ? <IoIosArrowDown onClick={() => setShowComments(!showComments)} size={"2rem"} className='cursor-pointer font-bold' /> : <RiArrowRightSLine onClick={() => setShowComments(!showComments)} size={"2rem"} className='cursor-pointer font-bold' />
            }
            <h1 className='text-[1.2rem] font-bold'> {
              comments?.length
            } {comments?.length <=1 ? "Comment":"Comments"}</h1>
          </div>

         {
             showComments &&  <div className="comments-container mt-3 w-full flex flex-col gap-3">

             {
               comments?.map((item, i) => {
                 return <div className='flex gap-2' key={i}>
                   <div className="profile-name">
                     <div className="profile">
                       <Avatar size='3rem' round={true} src={item?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl} />
                     </div>
                   </div>
 
                   <div className='w-full flex flex-col gap-1'>
 
                      <div className='w-full '>
                      <span className="name mr-1 text-[1rem] font-semibold text-gray-500">{item?.snippet?.topLevelComment?.snippet?.authorDisplayName}</span>
                       <small className='font-semibold text-gray-700'>{moment(item?.snippet?.topLevelComment?.snippet?.publishedAt).fromNow()}</small>
                      </div>
                      
                      <div className="actual-comment w-full leading-none">
                         <p className=' text-[0.9rem] font-semibold'>{item?.snippet?.topLevelComment?.snippet?.textDisplay}</p>
                         <div className="like-reply w-full flex items-center gap-5 mt-2">
                            <div className="like-count flex gap-1">
                            <BiLike/> <span>{item?.snippet?.topLevelComment?.snippet?.likeCount}</span>
                            </div>
                            <BiDislike/>
                             <span className='text-zinc-400 font-semibold text-[0.7rem]'>reply</span>
                         </div>
                      </div>
                   </div>
                 </div>
               })
             }
 
           </div>
         }

        </div>

      </div>

      {/* Sidebar Section */}
      <div className="w-full px-2 py-1 flex flex-col gap-3">
        {
          suggested?.map((item) => (
            <Link key={item.id.videoId} to={`?v=${item.id.videoId}`}>
              <SuggestedVideosCard video={item} />
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default Watch;
