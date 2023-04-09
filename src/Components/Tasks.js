import React, { useState, useEffect, useRef } from 'react';
// Redux.
import { useSelector, useDispatch } from 'react-redux';
// React Icons.
import { BiEdit } from "react-icons/bi";
import { HiEllipsisVertical } from "react-icons/hi2";
import { TiDelete } from "react-icons/ti";

function Tasks() {
    const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);
    const currentActiveBoard = useSelector((state) => state.ux.activeBoard);
    const [tasks, setTasks] = useState({});
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const dropdownRef = useRef();


    const closeTasksDropdownOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownActive(false);
        }
    };


    useEffect(() => {
        document.addEventListener("click", closeTasksDropdownOutsideClick);

        return () => {
            document.removeEventListener("click", closeTasksDropdownOutsideClick);
        }
    });


    return (
        <div className={isDarkTheme ? "tasks-wrapper tasks-wrapper-dark" : "tasks-wrapper"}>
            {/* ===================== Top Bar, Only on Desktop ===================== */}
            <div className='topbar-container'>
                <h3>{currentActiveBoard}</h3>
                <div className='topbar-btns'>
                    <button className='add-btn'>+ Add New Task</button>
                    <div className='dropdown-wrapper' ref={dropdownRef}>
                        <button className='mobile-menu' onClick={() => setIsDropdownActive(!isDropdownActive)}><HiEllipsisVertical /></button>
                        <div className={isDropdownActive ? "dropdown-container" : "dropdown-container dropdown-container-hide"} >
                            <button className='edit-board-btn'><BiEdit /> Edit Board</button>
                            <button className='delete-board-btn'><TiDelete /> Delete Board</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============= Content Container ============= */}
            {tasks ? (
                <div className='tasks-container'>
                    <div className='status-group'>
                        <h1><span></span> To Do (n)</h1>
                        <div className='status-cards-container'>
                            <div className='task-card'>
                                <h2>Card title</h2>
                                <p>0 out of # subtasks</p>
                            </div>
                        </div>
                    </div>
                    <div className='status-group'>
                        <h1><span></span> Doing (n)</h1>
                        <div className='status-cards-container'>
                            <div className='task-card'>
                                <h2>Card title</h2>
                                <p>0 out of # subtasks</p>
                            </div>
                        </div>
                    </div>
                    <div className='status-group'>
                        <h1><span></span> Done (n)</h1>
                        <div className='status-cards-container'>
                            <div className='task-card'>
                                <h2>Card title</h2>
                                <p>0 out of # subtasks</p>
                            </div>
                        </div>
                    </div>
                    <button className='new-column-btn'>+ New Column</button>
                </div>
            ) : (
                <div className='tasks-container-empty'>
                    none
                </div>
            )}
        </div>
    )
}

export default Tasks;