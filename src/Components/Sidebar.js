import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkTheme, hideSidebar, setActiveBoard, openAddTask, openNewBoardPop, openEdit } from "../Redux/ux";
// ===== React Icons.
import { BiChevronUp, BiChevronDown, BiHide, BiEdit } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import { HiEllipsisVertical, HiSun } from "react-icons/hi2";
import { TiDelete } from "react-icons/ti";
import { BsMoonStarsFill, BsClipboard2Plus, BsClipboard2Check, BsClipboard2 } from "react-icons/bs";


function Sidebar() {
    const dispatch = useDispatch();

    // ===== Redux state.
    const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);
    const isSidebarHidden = useSelector((state) => state.ux.isSidebarHidden);
    const currentActiveBoard = useSelector((state) => state.ux.activeBoard);
    const boardsTitles = useSelector((state) => state.boards.boards);

    // ===== Local state.
    const [isMobileCard, setIsMobileCard] = useState(true);
    const [isDropdown, setIsDropdown] = useState(false);

    // ===== Ref.
    const mobilDropdownRef = useRef(null);

    // ===== React Spring Transition.
    const transition = useTransition(isMobileCard, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    // ===== Change active board.
    const changeBoard = (board) => {
        dispatch(setActiveBoard(board));

        if (window.innerWidth < 1000) {
            setIsMobileCard(false);
        }
    }

    // ===== Proper display boards on big screen.
    const displayContentBigScreen = () => {
        if (window.innerWidth > 1000) {
            setIsMobileCard(true);
        } else {
            setIsMobileCard(false);
        }
    };

    // ===== Close boards modal on outside click.
    const closeBoardModalOutsideClick = (event) => {
        if (isMobileCard && event.target.className === "sidebar-content-wrapper") {
            setIsMobileCard(false);
        }
    };

    // ===== Close edit/delete dropdown.
    const closeDropdownOutsideClick = (event) => {
        if (mobilDropdownRef.current && !mobilDropdownRef.current.contains(event.target)) {
            setIsDropdown(false);
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


    return (
        <div className={isDarkTheme ? "sidebar-wrapper" : "sidebar-wrapper sidebar-wrapper-light"}>
            {/* ===================== Logo & Mobile Buttons ===================== */}
            <div className='logo-wrapper'>
                <div className='logo-container'>
                    <div className={isSidebarHidden ? "logo logo-hide" : "logo"}></div>
                    <h3>{currentActiveBoard}</h3>
                    <button className='open-btn' onClick={() => setIsMobileCard(!isMobileCard)}>{isMobileCard ? <BiChevronUp /> : <BiChevronDown />}</button>
                </div>
                <div className='mobile-btns'>
                    <button className='mobile-add' onClick={() => dispatch(openAddTask())}><IoIosAdd /></button>
                    <div className='dropdown-wrapper' ref={mobilDropdownRef} >
                        <button className='mobile-menu' onClick={() => setIsDropdown(!isDropdown)} ><HiEllipsisVertical /></button>
                        <div className={isDropdown ? "dropdown-container" : "dropdown-container dropdown-container-hide"}>
                            <button className='edit-board-btn' onClick={() => dispatch(openEdit())}><BiEdit /> Edit Board</button>
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
                            <cite>All Boards ({boardsTitles.length})</cite>
                            <div className={isSidebarHidden ? "active-boards active-boards-hide" : "active-boards"} >
                                {boardsTitles.map((el, i) => {
                                    return (
                                        <button key={i} className={currentActiveBoard === el.name ? "board-btn active-board-btn" : "board-btn"} onClick={() => changeBoard(el.name)}><span>{currentActiveBoard === el.name ? <BsClipboard2Check /> : <BsClipboard2 />}</span>{el.name}</button>
                                    )
                                })}
                            </div>

                            <button className='new-board-btn' onClick={() => dispatch(openNewBoardPop())}><span><BsClipboard2Plus /></span>+ Create New Board</button>
                        </div>


                        {/* =========== Theme Btn Container =========== */}
                        <div className={isSidebarHidden ? "theme-btn-wrapper theme-btn-wrapper-hide" : "theme-btn-wrapper"}>
                            <div className='theme-btn-container'>
                                <dfn><HiSun /></dfn>
                                <div className='theme-switcher' onClick={() => dispatch(toggleDarkTheme())} >
                                    <button className={isDarkTheme ? "theme-btn theme-btn-right" : "theme-btn"} />
                                </div>
                                <dfn><BsMoonStarsFill /></dfn>
                            </div>
                            <button className='hide-sidebar-btn' onClick={() => dispatch(hideSidebar())} ><BiHide/> Hide Sidebar</button>
                        </div>

                    </div>
                </animated.div>
            ) : null)}
        </div>
    )
}

export default Sidebar;