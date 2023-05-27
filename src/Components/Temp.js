import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { closeDetailsTask } from "../Redux/ux";
import { updateSubtasks, deleteSubtask } from "../Redux/boards";
import Edit from './Edit';

function Temp({object}) {
    const dispatch = useDispatch();

    // ===== Redux state.
    const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);
    const showThisPopup = useSelector((state) => state.ux.isDetailsPopActive);
    const activeBoard = useSelector((state) => state.ux.activeBoard);
    const showDetailsFor = useSelector((state) => state.ux.showDetailsFor);
    const board = useSelector((state) => state.boards.boards);

    // ===== Local state.
    const [taskDetails, setTaskDetails] = useState(object.main);
    const [status, setStatus] = useState(object.main.task_status);
    const [openFullEdit, setOpenFullEdit] = useState(null);


    // ===== React Spring Transition.
    const transition = useTransition(showThisPopup, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    // ===== Close edit/delete dropdown.
    const closeTasksDropdownOutsideClick = (event) => {
        if (showThisPopup && event.target.className === "task-details-wrapper") {
            dispatch(closeDetailsTask());
        }
    };


    const handleChecked = (index) => {
            const updatedArray = taskDetails.subtasks.map((item, i) => {
                if (i === index) {
                    return {
                        ...item,
                        isComplete: !item.isComplete
                    }
                }
                return item;
            })

            setTaskDetails({...object.main, subtasks: updatedArray})
            console.log(taskDetails.subtasks);
    }


    const changeStatus = (value) => {
        let obj = {
            task_title: taskDetails.task_title,
            task_status: value,
            task_desc: taskDetails.task_desc,
            subtasks: taskDetails.subtasks
        }

        setTaskDetails(obj);
        setStatus(value);
    }


    const handleSubmitChange = () => {
        dispatch(updateSubtasks({changeBoard: activeBoard, newObj: taskDetails}))
    }

    const toggleDelete = () => {
        dispatch(deleteSubtask({deleteFromBoard: activeBoard, index: object.index}))
    }

    useEffect(() => {
        setStatus(object.main.task_status);
        setTaskDetails(object.main)
        document.addEventListener("click", closeTasksDropdownOutsideClick);

        return () => {
            document.removeEventListener("click", closeTasksDropdownOutsideClick);
        }
    }, [object]);

    return (
        transition((style, showThisPopup) => showThisPopup ? (
            <animated.div style={style} className={showThisPopup ? "task-details-wrapper" : "task-details-wrapper task-details-wrapper-hide"} >
                <div className={isDarkTheme ? "task-details-container" : "task-details-container task-details-container-light"}>
                    <h1>{taskDetails.task_title}</h1>
                    <p>{taskDetails.task_desc}</p>

                    <button onClick={() => setOpenFullEdit(taskDetails)}>Edit</button>
                    <button onClick={toggleDelete}>Delete</button>

                    <div className='subtasks-container'>
                        {taskDetails.subtasks.map((el, i) => el.isComplete ? (
                            <div onClick={() => handleChecked(i)}>
                                <input type="checkbox" checked />
                                <del>{el.subtask_name}</del>
                            </div>
                        ) : (
                            <div onClick={() => handleChecked(i)}>
                                <input type="checkbox" />
                                <label>{el.subtask_name}</label>                                
                            </div>
                        ))}
                    </div>

                    <div>
                        <label>Status</label>
                        <select value={status} onChange={(e) => changeStatus(e.target.value)} >
                            {object.statuses.map((el, i) => {
                                return (
                                    <option key={i} value={el}>{el}</option>
                                )
                            })}
                        </select>
                    </div>

                    <button onClick={handleSubmitChange}>Change</button>

                </div>

                {openFullEdit && <Edit obj={taskDetails} statuses={object.statuses} />}

            </animated.div>
        ) : null)
    )
}

export default Temp;