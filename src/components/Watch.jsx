import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
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

  const [videoData, setVideoData] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [more, setMore] = useState(false);
  const [showComments, setShowComments] = useState(true);

  const { isDarkMode } = useSelector(store => store.app);

  useEffect(() => {
    if (!videoId) return;

    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`${BASE_URL}/videos`, {
          params: {
            part: 'snippet,statistics',
            id: videoId,
            key: API_KEY
          }
        });

        if (videoRes.data.items.length === 0) return;

        const videoDetails = videoRes.data.items[0];
        setVideoData(videoDetails);

        // Fetch channel details & related videos simultaneously
        const [channelRes, suggestedRes, commentsRes] = await Promise.all([
          axios.get(`${BASE_URL}/channels`, {
            params: {
              part: 'snippet,statistics',
              id: videoDetails.snippet.channelId,
              key: API_KEY
            }
          }),
          axios.get(`${BASE_URL}/search`, {
            params: {
              part: 'snippet',
              maxResults: 3,
              type: 'video',
              videoCategoryId: videoDetails.snippet.categoryId,
              key: API_KEY
            }
          }),
          axios.get(`${BASE_URL}/commentThreads`, {
            params: {
              part: 'snippet',
              videoId,
              key: API_KEY,
              maxResults: 50
            }
          })
        ]);

        setVideoData(prevData => ({
          ...prevData,
          channelInfo: channelRes.data.items[0]
        }));
        setSuggestedVideos(suggestedRes.data.items);
        setComments(commentsRes.data.items);

      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchData();
  }, [videoId]);

  const formatSubscribers = (num) => {
    if (!num) return '0';
    return num >= 1e9 ? (num / 1e9).toFixed(1) + 'B'
      : num >= 1e6 ? (num / 1e6).toFixed(1) + 'M'
        : num >= 1e3 ? (num / 1e3).toFixed(1) + 'K'
          : num.toString();
  };

  return (
    <div className='watch-page w-screen h-[calc(100vh-6.42rem)] overflow-x-hidden overflow-y-scroll px-2 md:px-5 grid gap-3 grid-cols-1 md:grid-cols-[65%_35%]'>
      <div className="video-section">
        <iframe
          className='w-full h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] rounded-md'
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>

        <h3 className='text-lg font-bold mt-3'>
          {videoData?.snippet?.title}
        </h3>

        <div className="channel-details flex flex-wrap items-center justify-between gap-3 mt-3">
          <div className="flex items-center gap-3">
            <Avatar src={videoData?.channelInfo?.snippet?.thumbnails?.medium?.url} size='40' round />
            <div>
              <h3 className='text-sm font-semibold'>{videoData?.snippet?.channelTitle}</h3>
              <h4 className='text-xs text-gray-600'>{formatSubscribers(videoData?.channelInfo?.statistics?.subscriberCount)} subscribers</h4>
            </div>
            <button className='px-4 py-2 bg-black hover:bg-zinc-900 text-white rounded-full text-sm'>Subscribe</button>
          </div>

          <div className="flex gap-3 items-center flex-wrap">
            <div className={`flex items-center ${isDarkMode ? "bg-gray-500" : "bg-gray-200 "} rounded-full px-4 py-2`}>
              <BiLike
                className={`cursor-pointer ${liked ? "text-red-500" : ""}`}
                onClick={() => setLiked(!liked)}
                size="1.2rem"
              />
              <h4 className='text-xs mx-2'>{formatSubscribers(videoData?.statistics?.likeCount)}</h4>
              <div className="border-l border-gray-400 h-5 mx-2"></div>
              <BiDislike className="cursor-pointer" size="1.2rem" />
            </div>

            <button className={`flex items-center gap-2 px-4 py-2 ${isDarkMode ? "bg-gray-500" : "bg-gray-200"} rounded-full text-sm`}>
              <PiShareFat />
              Share
            </button>
          </div>
        </div>

        <div className='description w-full my-3 bg-gray-200 px-1 h-fit py-1 rounded-lg '>
          <div className="view-and-time-and-tags flex flex-wrap items-center ">
            <span className='text-[0.9rem] font-semibold mr-2'>{formatSubscribers(videoData?.statistics?.viewCount)} views</span>
            <span className='text-[0.9rem] font-semibold mr-2'>{moment(videoData?.snippet?.publishedAt).format('MMMM DD, YYYY')}</span>
            {videoData?.snippet?.tags?.map((tag, i) => (
              <span key={i} className='text-blue-600 mr-3 text-[0.71rem]  font-semibold'>#{tag}</span>
            ))}
            <p className='w-full text-[0.8rem] text-gray-800 font-semibold'>
              {more ? videoData?.snippet?.description : videoData?.snippet?.description.slice(0, 100)}
              <span className='text-zinc-700 font-semibold cursor-pointer' onClick={() => setMore(!more)}>
                {more ? ' ...show less' : ' ...show more'}
              </span>
            </p>
          </div>
        </div>

        <div className="comments w-full mt-5 mb-5">
          <div className="comments-length flex items-center gap-1">
            {showComments ? <IoIosArrowDown size={"2rem"} className='cursor-pointer' onClick={() => setShowComments(!showComments)} />
              : <RiArrowRightSLine size={"2rem"} className='cursor-pointer' onClick={() => setShowComments(!showComments)} />}
            <h1 className='text-[1.2rem] font-bold'>{comments?.length} {comments?.length <= 1 ? "Comment" : "Comments"}</h1>
          </div>
        </div>
      </div>

      <div className="w-full px-2 py-1 flex flex-col gap-3">
        {suggestedVideos?.map((item) => (
          <Link key={item.id.videoId} to={`?v=${item.id.videoId}`}>
            <SuggestedVideosCard video={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Watch;
