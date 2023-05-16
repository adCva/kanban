import React, { useState, useEffect, useRef } from 'react';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
// ===== React Icons.
import { HiEllipsisVertical } from "react-icons/hi2";
import { BiEdit } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";


function Temp() {
  const dispatch = useDispatch();

  // ===== Redux state.
  const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);
  const isSidebar = useSelector((state) => state.ux.isSidebarHidden);
  const currentActiveBoard = useSelector((state) => state.ux.activeBoard);
  const boardsTasks = useSelector((state) => state.boards.boards);

  // ===== Local state.
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [tasks, setTasks] = useState();

  // ===== Ref.
  const dropdownRef = useRef(null);

  // ===== Close edit/delete dropdown.
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
    <div className={isDarkTheme ? "tasks-wrapper" : "tasks-wrapper tasks-wrapper-light"} >

        {/* ===================== Top Bar, Only on Desktop ===================== */}
        <div className='topbar-container'>

          <div className='topbar-info'>
            <div className={isSidebar ? "topbar-logo" : "topbar-logo topbar-logo-hide"}>
              <div className='line'></div>
              <div className='line'></div>
              <div className='line'></div>
            </div>
            <h3>{currentActiveBoard}</h3>
          </div>

          <div className='topbar-btns'>
            <button className='add-btn'>+ Add New Board</button>
            <div className='dropdown-wrapper' ref={dropdownRef} >
              <button className='mobile-menu' onClick={() => setIsDropdownActive(!isDropdownActive)} ><HiEllipsisVertical /></button>
              <div className={isDropdownActive ? "dropdown-container" : "dropdown-container dropdown-container-hide"} >
                <button className='edit-board-btn'><BiEdit /> Edit Board</button>
                <button className='delete-board-btn'><TiDelete /> Delete Board</button>
              </div>
            </div>
          </div>

        </div>

        {/* ============= Tasks Content Container ============= */}
        {boardsTasks.filter(board => board.name === currentActiveBoard).map((board, i) => board.tasks.length > 0 ? (
          <div className='tasks-container' key={i}>

            <div className='status-group'>
              <h1><span className='todo-span'></span> To Do ({board.tasks.filter(stat => stat.task_status === "todo").length})</h1>
              {board.tasks.map((el, j) => el.task_status === "todo" ? (
                <div className='status-cards-container'>
                  <div className='task-card' onClick={() => console.log(el)}>
                    <h2>{el.task_title}</h2>
                    <p>{el.subtasks.filter(sub => sub.subtask_status === "complete").length} out of {el.subtasks.length}</p>
                  </div>
                </div>                  
              ) : null)}
            </div>

            <div className='status-group'>
              <h1><span className='doing-span'></span> Doing ({board.tasks.filter(stat => stat.task_status === "doing").length})</h1>
              {board.tasks.map((el, j) => el.task_status === "doing" ? (
                <div className='status-cards-container'>
                  <div className='task-card' onClick={() => console.log(el)}>
                    <h2>{el.task_title}</h2>
                    <p>{el.subtasks.filter(sub => sub.subtask_status === "complete").length} out of {el.subtasks.length}</p>
                  </div>
              </div>                  
              ) : null)}
            </div>

            <div className='status-group'>
              <h1><span className='done-span'></span> Done ({board.tasks.filter(stat => stat.task_status === "done").length})</h1>
              {board.tasks.map((el, j) => el.task_status === "done" ? (
                <div className='status-cards-container'>
                  <div className='task-card' onClick={() => console.log(el)}>
                    <h2>{el.task_title}</h2>
                    <p>{el.subtasks.filter(sub => sub.subtask_status === "complete").length} out of {el.subtasks.length}</p>
                  </div>
                </div>                  
              ) : null)}              
            </div>

            <button className='add-column-btn'>+ New Column</button>

          </div>
        ) : (
          <div className='tasks-container-empty'>
            <h1>This board contains no tasks.</h1>
            <button>Create Task</button>
          </div>
        ))}

    </div>
  )
}

export default Temp;