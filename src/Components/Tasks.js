import React, { useState, useEffect, useRef } from 'react';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { openAddTask, openEdit, updateShowDetailsFor, toggleDetailsPopActive } from "../Redux/ux";
import { deleteBoard } from "../Redux/boards";
// ===== React Icons.
import { HiEllipsisVertical } from "react-icons/hi2";
import { BiEdit } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import Temp from "./Temp";


function Tasks() {
  const dispatch = useDispatch();

  // ===== Redux state.
  const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);
  const isSidebar = useSelector((state) => state.ux.isSidebarHidden);
  const currentActiveBoard = useSelector((state) => state.ux.activeBoard);
  const boardsTasks = useSelector((state) => state.boards.boards);

  // ===== Local state.
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [tasks, setTasks] = useState();
  const [selectedObject, setSelectedObject] = useState(null);

  // ===== Ref.
  const dropdownRef = useRef(null);

  // ===== Close edit/delete dropdown.
  const closeTasksDropdownOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownActive(false);
    }
  };


  // ===== Decide task status group span class color.
  const decideStatusGroupSpanClassColor = (status) => {
    if (status === "to do" || status === "todo") {
      return "todo-span";
    } else if (status === "doing") {
      return "doing-span";
    } else if (status === "done") {
      return "done-span";
    } else {
      return "random-color-span";
    }
  }


  const openDetails = (el, board, index) => {
    const detailsObject = {
      main: el,
      statuses: board.avaiableStatuses,
      index: index
    }
    setSelectedObject(detailsObject);
    dispatch(toggleDetailsPopActive());
  }


  
  const deleteBrd = () => {
    dispatch(deleteBoard({board: currentActiveBoard}));
}


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
            <button className='add-btn' onClick={() => dispatch(openAddTask())}>+ Add New Task</button>
            <div className='dropdown-wrapper' ref={dropdownRef} >
              <button className='mobile-menu' onClick={() => setIsDropdownActive(!isDropdownActive)} ><HiEllipsisVertical /></button>
              <div className={isDropdownActive ? "dropdown-container" : "dropdown-container dropdown-container-hide"} >
                <button className='edit-board-btn' onClick={() => dispatch(openEdit())}><BiEdit /> Edit Board</button>
                <button className='delete-board-btn' onClick={() => deleteBrd()}><TiDelete /> Delete Board</button>
              </div>
            </div>
          </div>

        </div>

        {/* ============= Tasks Content Container ============= */}
        {boardsTasks.filter(board => board.name === currentActiveBoard).map((board, i) => board.tasks.length > 0 ? (
          <div className='tasks-container' key={i}>

            <div className='status-group'>
              {[... new Set(board.tasks.map(status => status.task_status))].map(status => {
                return (
                  <div className='task-card'>
                    <h1><span className={decideStatusGroupSpanClassColor(status)}></span> {status} ({board.tasks.filter(stat => stat.task_status === status).length})</h1>
                    {board.tasks.map((el, j) => el.task_status === status ? (
                      <div className='status-cards-container' onClick={() => openDetails(el, board, j)} >
                        <div className='task-card'>
                          <h2>{el.task_title}</h2>
                          <p>{el.subtasks.filter(sub => sub.isComplete === true).length} out of {el.subtasks.length}</p>
                        </div>
                      </div>                  
                    ) : null)}
                  </div>
                )
              })}
            </div>

            <button className='add-column-btn'>+ New Column</button>

          </div>
        ) : (
          <div className='tasks-container-empty'>
            <h1>This board contains no tasks.</h1>
            <button onClick={() => dispatch(openAddTask())}>Create Task</button>
          </div>
        ))}


        {selectedObject && <Temp object={selectedObject} />}

    </div>
  )
}

export default Tasks;