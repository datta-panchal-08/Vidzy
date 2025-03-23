import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setCatgeory } from '../utils/AppSlice';

const ButtonList = () => {
  const [active,setActive] = useState("All");
  const dispatch = useDispatch();
  const categories = [
    "All",
    "Music",
    "React routers",
    "Computer programming",
    "Reverberation",
    "Movie musicals",
    "India national cricket team",
    "News",
    "Mixes",
    "1990s",
    "Telugu cinema",
    "Live",
    "Dramedy",
    "Dubbing",
    "Indian soap opera",
    "Cricket",
    "Football",
    "Learn Coding",
  ];

  const getVideoByTag = (tag) =>{
    if(active !== tag){
    setActive(tag);
    dispatch(setCatgeory(tag));
  }
}
console.log(active);

  return (
    <div className="flex flex-nowrap overflow-x-auto custom-scrollbar1 gap-5 sticky top-0 bg-white">
      {categories?.map((category,index) => (
        <div
          key={index}
          onClick={()=>getVideoByTag(category)}
          className=
          {`mb-3 flex-none ${active === category ? "bg-slate-600 text-white":"bg-gray-200 text-gray-700"}  duration-300 rounded-xl px-3 py-0 font-medium  cursor-pointer`}
        >
          {category}
        </div>
      ))}
    </div>

  )
}

export default ButtonList