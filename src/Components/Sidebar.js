import React, { useState, useRef, useEffect } from 'react';
// React Spring.
import { useTransition, animated } from '@react-spring/web';
// React Icons.
import { BiChevronUp, BiChevronDown, BiHide, BiEdit } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import { HiEllipsisVertical, HiSun } from "react-icons/hi2";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
// Redux.
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkTheme, hideSidebar, setActiveBoard, toggleAddTask } from "../Redux/ux";

function Sidebar() {
    const dispatch = useDispatch();
    const mobilDropdownRef = useRef(null);
    const [isMobileCard, setIsMobileCard] = useState(true);
    const [isDropdown, setIsDropdown] = useState(false);
    const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);
    const isSidebarHidden = useSelector((state) => state.ux.isSidebarHidden);
    const currentActiveBoard = useSelector((state) => state.ux.activeBoard);


    const transition = useTransition(isMobileCard, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });


    const closeBoardModalOutsideClick = (event) => {
        if (isMobileCard && event.target.className === "sidebar-content-wrapper") {
            setIsMobileCard(false);
        }
    };


    const closeDropdownOutsideClick = (event) => {
        if (mobilDropdownRef.current && !mobilDropdownRef.current.contains(event.target)) {
            setIsDropdown(false);
        }
    };


    const displayContentBigScreen = () => {
        if (window.innerWidth > 1000) {
            setIsMobileCard(true);
        } else {
            setIsMobileCard(false);
        }
    };


    useEffect(() => {
        document.addEventListener("click", closeBoardModalOutsideClick);
        document.addEventListener("click", closeDropdownOutsideClick);
        window.addEventListener("DOMContentLoaded", displayContentBigScreen);
        window.addEventListener("resize", displayContentBigScreen);

        return () => {
            document.removeEventListener("click", closeBoardModalOutsideClick);
            document.removeEventListener("click", closeDropdownOutsideClick);
            window.removeEventListener("DOMContentLoaded", displayContentBigScreen);
            window.removeEventListener("resize", displayContentBigScreen);
        }
    });



    const changeBoard = (board) => {
        dispatch(setActiveBoard(board));

        if (window.innerWidth < 1000) {
            setIsMobileCard(false);
        }
    }


    const testFnc = () => {
        console.log("test");
        dispatch(toggleAddTask);
    }


    return (
        <div className={isDarkTheme ? "sidebar-wrapper sidebar-wrapper-dark" : "sidebar-wrapper"}>
            {/* ===================== Logo & Mobile Buttons ===================== */}
            <div className='logo-wrapper'>
                <div className='logo-container'>
                    <div className={isSidebarHidden ? "logo logo-hide" : "logo"}></div>
                    <h3>{currentActiveBoard}</h3>
                    <button onClick={() => setIsMobileCard(!isMobileCard)}>{isMobileCard ? <BiChevronUp /> : <BiChevronDown />}</button>
                </div>
                <div className='mobile-btns'>
                    <button className='mobile-add' onClick={testFnc}><IoIosAdd /></button>
                    <div className='dropdown-wrapper' ref={mobilDropdownRef}>
                        <button className='mobile-menu' onClick={() => setIsDropdown(!isDropdown)}><HiEllipsisVertical /></button>
                        <div className={isDropdown ? "dropdown-container" : "dropdown-container dropdown-container-hide"} >
                            <button className='edit-board-btn'><BiEdit /> Edit Board</button>
                            <button className='delete-board-btn'><TiDelete /> Delete Board</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===================== Sidebar Content ===================== */}
            {transition((style, isMobileCard) => isMobileCard ? (
                <animated.div style={style} className="sidebar-content-wrapper">
                    <div className='sidebar-content-container'>
                        
                        {/* =========== Boards List =========== */}
                        <div className='active-boards-container'>
                            <cite>All Boards (0)</cite>
                            <div className={isSidebarHidden ? "active-boards active-boards-hide" : "active-boards"}>
                                <button className={currentActiveBoard === "Platform Launch" ? "board-btn active-board-btn" : "board-btn"} onClick={() => changeBoard("Platform Launch")}><span><MdOutlineSpaceDashboard /></span> Platform Launch</button>
                                <button className={currentActiveBoard === "Marketing Plan" ? "board-btn active-board-btn" : "board-btn"} onClick={() => changeBoard("Marketing Plan")}><span><MdOutlineSpaceDashboard /></span> Marketing Plan</button>
                                <button className={currentActiveBoard === "Roadmap" ? "board-btn active-board-btn" : "board-btn"} onClick={() => changeBoard("Roadmap")}><span><MdOutlineSpaceDashboard /></span> Roadmap</button>
                            </div>
                        </div>

                        {/* =========== Theme Btn Container =========== */}
                        <div className={isSidebarHidden ? "theme-btn-wrapper theme-btn-wrapper-hide" : "theme-btn-wrapper"}>
                            <div className='theme-btn-container'>
                                <dfn><HiSun /></dfn>
                                <div className='theme-switcher' onClick={() => dispatch(toggleDarkTheme())}>
                                    <button className={isDarkTheme ? "theme-btn theme-btn-right" : "theme-btn"} />
                                </div>
                                <dfn><BsMoonStarsFill /></dfn>
                            </div>
                            <button className='hide-sidebar-btn' onClick={() => dispatch(hideSidebar())}><BiHide/> Hide Sidebar</button>
                        </div>

                    </div>
                </animated.div>
            ) : null)}
        </div>
    )
}

export default Sidebar;