import React from "react";
import { BiVideo } from "react-icons/bi";
import { FaChevronRight, FaGraduationCap, FaYoutube } from "react-icons/fa";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { GiFeatherNecklace, GiLinkedRings, GiNewspaper } from "react-icons/gi";
import { GoHome, GoTrophy } from "react-icons/go";
import { IoIosRadio } from "react-icons/io";
import { IoGameController, IoMusicalNotesOutline, IoSettingsOutline } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import {
  MdOutlineFeedback,
  MdOutlineHistory,
  MdOutlineOutlinedFlag,
  MdOutlinePodcasts,
  MdOutlineSubscriptions,
  MdWatchLater,
} from "react-icons/md";
import { PiFilmSlate } from "react-icons/pi";
import { RiGraduationCapLine } from "react-icons/ri";
import { SiMediafire, SiYoutubekids, SiYoutubemusic, SiYoutubeshorts, SiYoutubestudio } from "react-icons/si";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { isSidebarVisible } = useSelector(store => store.app);
  const {isDarkMode} = useSelector(store=>store.app);
  const sidebarItems = [
    {
      id: 1,
      name: "Home",
      icon: <GoHome className="text-xl" />,
    },
    {
      id: 2,
      name: "Shorts",
      icon: <SiYoutubeshorts className="text-xl" />,
    },
    {
      id: 3,
      name: "Subscriptions",
      icon: <MdOutlineSubscriptions className="text-xl" />,
    },
  ];

  const sidebarItems2 = [
    {
      id: 1,
      name: "Your channel",
      icon: <GoHome className="text-xl" />,
    },
    {
      id: 2,
      name: "History",
      icon: <MdOutlineHistory className="text-xl" />,
    },
    {
      id: 3,
      name: "Playlists",
      icon: <MdOutlineSubscriptions className="text-xl" />,
    },
    {
      id: 4,
      name: "Your videos",
      icon: <BiVideo className="text-xl" />,
    },
    {
      id: 5,
      name: "Watch later",
      icon: <MdWatchLater className="text-xl" />,
    },
    {
      id: 6,
      name: "Liked videos",
      icon: <GiLinkedRings className="text-xl" />,
    },
  ];

  const sidebarItems3 = [
    {
      id: 1,
      name: "Trending",
      icon: <SiMediafire className="text-xl" />,
    },
    {
      id: 2,
      name: "Shopping",
      icon: <LuShoppingBag className="text-xl" />,
    },
    {
      id: 3,
      name: "Music",
      icon: <IoMusicalNotesOutline className="text-xl" />,
    },
    {
      id: 4,
      name: "Films",
      icon: <PiFilmSlate className="text-xl" />,
    },
    {
      id: 5,
      name: "Live",
      icon: <IoIosRadio className="text-xl" />,
    },
    {
      id: 6,
      name: "Gaming",
      icon: <IoGameController className="text-xl" />,
    },
    {
      id: 7,
      name: "News",
      icon: <GiNewspaper className="text-xl" />,
    },
    {
      id: 8,
      name: "Sports",
      icon: <GoTrophy className="text-xl" />,
    },
    {
      id: 9,
      name: "Courses",
      icon: <RiGraduationCapLine className="text-xl" />,
    },
    {
      id: 10,
      name: "Podcasts",
      icon: <MdOutlinePodcasts className="text-xl" />,
    },
  ];

  const sidebarItems4 = [
    {
      id: 1,
      name: "Vidzy Premium",
      icon: <FaYoutube className="text-xl text-red-600 " />,
    },
    {
      id: 2,
      name: "Vidzy Studio",
      icon: <SiYoutubestudio className="text-xl text-red-600 " />,
    },
    {
      id: 3,
      name: "Vidzy Music",
      icon: <SiYoutubemusic className="text-xl text-red-600 " />,
    },
    {
      id: 4,
      name: "Vidzy Kids",
      icon: <SiYoutubekids className="text-xl text-red-600 " />,
    },
  ];

  const sidebarItems5 = [
    {
      id: 1,
      name: "Settings",
      icon: <IoSettingsOutline className="text-xl" />
    },
    {
      id: 2,
      name: "Report history",
      icon: <MdOutlineOutlinedFlag className="text-xl" />
    },
    {
      id: 3,
      name: "Help",
      icon: <FaRegCircleQuestion className="text-xl" />
    },
    {
      id: 4,
      name: "Send feedback",
      icon: <MdOutlineFeedback className="text-xl" />
    },

  ]

  return isSidebarVisible === true && (
    <div
    className={`px-6 h-[calc(100vh-4.100rem)] 
      lg:h-screen 
      lg:w-[19%] lg:relative xl:h-[calc(100vh-4.100rem)] 2xl:h-[calc(100vh-6.6rem)] 
      md:h-[calc(100vh-4.100rem)] overflow-y-scroll overflow-x-hidden 
      sm:w-[30%] md:w-[23%] xl:w-[19%] 2xl:w-[19%] absolute z-50 
      ${isDarkMode ? "bg-gray-900":"bg-white"}
      custom-scrollbar2
    `}
  >
  

      {/* Home */}
      <div className="space-y-3">
        {sidebarItems.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center space-x-6 hover:bg-gray-200 p-1 duration-300 cursor-pointer rounded-xl"
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          );
        })}
        <hr />
      </div>

      {/* You */}
      <div className="space-y-3 mt-4">
        <div className="flex items-center space-x-2">
          <h1>You</h1>
          <span>
            <FaChevronRight />
          </span>
        </div>
        {sidebarItems2.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center space-x-6 hover:bg-gray-200 p-1 duration-300 cursor-pointer rounded-xl"
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          );
        })}
        <hr />
      </div>

      {/* Explore */}
      <div className="space-y-3 mt-4">
        <div className="flex items-center space-x-2">
          <h1 className="font-semibold">Explore</h1>
          <span>
            <FaChevronRight />
          </span>
        </div>
        {sidebarItems3.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center space-x-6 hover:bg-gray-200 p-1 duration-300 cursor-pointer rounded-xl"
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          );
        })}
        <hr />
      </div>

      {/* More */}
      <div className="space-y-3 mt-4">
        <div className="flex items-center space-x-2">
          <h1 className="font-semibold">More from Vidzy</h1>
          <span>
            <FaChevronRight />
          </span>
        </div>
        {sidebarItems4.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center space-x-6 hover:bg-gray-200 p-1 duration-300 cursor-pointer rounded-xl"
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          );
        })}
        <hr />
      </div>

      {/* Settings & help */}
      <div className="space-y-3 mt-4">
        {/* <div className="flex items-center space-x-2">
          <h1 className="font-semibold">More from Vidzy</h1>
          <span>
            <FaChevronRight />
          </span>
        </div> */}
        {sidebarItems5.map((item) => {
          return (
            <div
              key={item.id}
              className="flex items-center space-x-6 hover:bg-gray-200 p-1 duration-300 cursor-pointer rounded-xl"
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          );
        })}
        <hr />
      </div>
      <br />
      <span className="text-xs font-semibold">
        About Press Copyright <br /> Contact us Creator Advertise <br /> Developers <br /> <br />
        <p className="">Terms Privacy Policy & Safety <br /> How Vidzy works <br /> Test new features</p>
      </span>
      <span className="text-xs font-semibold text-gray-500">&copy; 2025 Vidzy</span>
    </div>
  );
};

export default Sidebar;
