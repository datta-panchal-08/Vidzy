import React, { useState } from "react";
import { AiOutlineBell, AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import vidzyLogo from '../assets/logo.png';
import { RiCloseFill, RiVideoAddLine } from "react-icons/ri";
import { FiMoon, FiSunrise } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setSidebarVisibility } from "../utils/AppSlice";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
    const [isSerachActive, setSerachActive] = useState(false);
    const [input,setInput] = useState("")
    const dispatch = useDispatch();


    const serachHandler = (e) =>{
        setInput(e);
    }

    const toggleHandler = () => {
        dispatch(setSidebarVisibility());
    }
    return (
        <div className="w-full sticky z-10 top-0 flex items-center bg-white justify-between md:px-6 lg:px-6 px-2 py-2">

            {/* Left navbar */}
            <div className={`flex w-[20%] items-center md:gap-5 lg:gap-5 gap-2 ${isSerachActive === true ? "hidden" : "block"}`}>
                <div className="menubar">
                    <AiOutlineMenu onClick={toggleHandler} className="text-xl cursor-pointer" />
                </div>
                <div className="logo flex gap-1 items-center">
                    <img
                        className="md:w-9 w-5 h-5 md:h-8 lg:w-9 lg:h-8 cursor-pointer"
                        src={vidzyLogo}
                        alt="StreamFlow Logo"
                    />
                    <h1 className="font-[500] cursor-pointer md:text-xl lg:text-xl text-sm">Vidzy</h1>
                </div>
            </div>

            {/* Search box */}
            <div className={`md:flex lg:flex ${isSerachActive === true ? "flex" : "hidden"} md:w-[60%] lg:w-[60%] justify-center items-center`}>
                <div className="w-full max-w-[400px] rounded-l-full px-3 py-2 border border-gray-300">
                    <input onChange={(e)=>serachHandler(e.target.value)} type="text" className="outline-none w-full" placeholder="Search" />
                </div>
                <button className="px-4 bg-gray-100 py-2 rounded-r-full border-gray-300 border">
                    <CiSearch size={"24px"} />
                </button>
                <IoMdMic size={"42px"} className="ml-3 rounded-full hidden md:block lg:block p-2 hover:bg-gray-200 cursor-pointer duration-200" />
            </div>

            {/* Profile and other icons */}
            <div className="flex md:w-fit w-fit items-center justify-end md:space-x-5 lg:space-x-5 space-x-4">
                <RiVideoAddLine className="text-2xl hidden md:block" />
                <AiOutlineBell className="text-2xl hidden md:block" />
                {
                    isSerachActive === false ? (
                        <CiSearch onClick={() => setSerachActive(!isSerachActive)} className="text-2xl md:hidden lg:hidden block" />
                    ) : (
                        <RiCloseFill onClick={() => setSerachActive(!isSerachActive)} className="text-2xl md:hidden lg:hidden block" />
                    )
                }
                {
                    isDarkMode === false ? (
                        <FiSunrise onClick={() => setIsDarkMode(!isDarkMode)} className="text-2xl block" />
                    ) : (
                        <FiMoon onClick={() => setIsDarkMode(!isDarkMode)} className="text-2xl block" />
                    )
                }
                <img src="https://i.redd.it/s8mx3thw9v7b1.jpg" className="w-8 h-8 rounded-full" />
            </div>
        </div>
    );
};

export default Navbar;
