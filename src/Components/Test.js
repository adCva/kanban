import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web'
// React Icons.
import { BiChevronUp, BiChevronDown, BiHide } from "react-icons/bi";
import { HiEllipsisVertical, HiSun } from "react-icons/hi2";
import { IoIosAdd } from "react-icons/io";
import { BsMoonStarsFill } from "react-icons/bs";
import { MdOutlineSpaceDashboard } from "react-icons/md";


function Test() {
  const mobileBoardCardRef = useRef(null);
  const [isBoardCardOpen, setIsBoardCardOpen] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  const transition = useTransition(isBoardCardOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });  


  const closeBoardModalOutsideClick = (event) => {
    if (isBoardCardOpen && event.target.className === "sidebar-content-wrapper") {
      setIsBoardCardOpen(false);
    }
  };

  const displayContentBigScreen = () => {
    if (window.innerWidth > 1000) {
      console.log("big");
      setIsBoardCardOpen(true);
    } else {
      setIsBoardCardOpen(false);
    }
  };


  const handleTheme = () => {
    setDarkTheme(!darkTheme);
  };


  useEffect(() => {
    document.addEventListener("click", closeBoardModalOutsideClick);
    window.addEventListener("DOMContentLoaded", displayContentBigScreen);
    window.addEventListener("resize", displayContentBigScreen);

    return () => {
      document.removeEventListener("click", closeBoardModalOutsideClick);
      window.removeEventListener("DOMContentLoaded", displayContentBigScreen);
      window.removeEventListener("resize", displayContentBigScreen);
    }
  });


  return (
    <div className='sidebar-wrapper'>
      {/* ===================== Logo & Mobile Buttons ===================== */}
      <div className='sidebar-logo-container'>
        {/* ==== Logo ==== */}
        <div className='logo-left'>
          <div className='logo'></div>
          <button onClick={() => setIsBoardCardOpen(true)}>{isBoardCardOpen ? <BiChevronUp /> : <BiChevronDown />}</button>
        </div>

        {/* ==== Add Mobile ==== */}
        <div className='logo-right'>
          <button className='add'><IoIosAdd /></button>
          <button className='dots'><HiEllipsisVertical /></button>
        </div>
      </div>

      {/* ===================== Sidebar Content Details ===================== */}
      {transition((style, isBoardCardOpen) => isBoardCardOpen ? (
        <animated.div className="sidebar-content-wrapper" style={style}>
          <div className='sidebar-content-container' ref={mobileBoardCardRef}>

            <div className='active-boards-container'>
              <cite>All Boards (0)</cite>
              <div className='existing-boards'>
                <button className='active-board' draggable><span><MdOutlineSpaceDashboard /></span> Platform Launch</button>
                <button draggable><span><MdOutlineSpaceDashboard /></span> Marketing Plan</button>
                <button draggable><span><MdOutlineSpaceDashboard /></span> Roadmap</button>
              </div>
              <button className='create-board'><span><MdOutlineSpaceDashboard /></span> + Create New Board</button>
            </div>

            <div className='theme-btn-wrapper'>
              <div className='theme-btn-container'>
                <dfn><HiSun /></dfn>
                <div className='theme-switcher' onClick={handleTheme}>
                  <button className={darkTheme ? "theme-btn theme-btn-right" : "theme-btn"} />
                </div>
                <dfn><BsMoonStarsFill /></dfn>
              </div>
              <button className='hide-sidebar-btn'><BiHide/> Hide Sidebar</button>
            </div>

          </div>
        </animated.div>
      ) : null)}

    </div>
  )
}

export default Test;