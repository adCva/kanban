import React, { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';
// React Icons.
import { HiDotsVertical } from "react-icons/hi";
// Redux.
import { useSelector, useDispatch } from 'react-redux';

function ViewTask(props) {
    const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);
    const [isViewTaskPopupOpened, setIsViewTaskPopupOpened] = useState(true);
    const [radioButtons, setRadioButtons] = useState([
        {id: 1, label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. #1", isChecked: false},
        {id: 2, label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. #2", isChecked: false},
        {id: 3, label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. #3", isChecked: false}
    ]);

    const transition = useTransition(isViewTaskPopupOpened, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    }); 


    const handleRadioCheck = (event) => {
        const id = Number(event.target.id);
        let updateRadioButtons = radioButtons.map(el => el.id === id ? el.isChecked === true ? {...el, isChecked: false } : {...el, isChecked: true } : el);


        console.log(radioButtons);
        setRadioButtons(updateRadioButtons);
    };


    return (
        transition((style, isViewTaskPopupOpened) => isViewTaskPopupOpened ? (
            <animated.div style={style} className="view-task-wrapper" >
                <div className={isDarkTheme ? "view-task-container view-task-container-dark" : "view-task-container"}>

                    <div className='title-and-btn'>
                        <h1>Task title: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h1>
                        <button><HiDotsVertical /></button>
                    </div>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

                    {/* ===================== Subtasks ===================== */}
                    <div className='view-task-subtasks-wrapper'>
                        <h5>Subtasks (2 of 3)</h5>

                        {radioButtons.map((el, i) => {
                            return (
                                <div key={i} className='view-task-subtask-container' >
                                    <input type='checkbox' id={el.id} onClick={handleRadioCheck} checked={el.isChecked} />
                                    <label htmlFor={el.id}>{el.isChecked ? <s>{el.label}</s> : el.label}</label>
                                </div>
                            )
                        })}

                    </div>

                    {/* ===================== Status ===================== */}
                    <div className='view-task-status-container'>
                        <h5>Status</h5>
                        <select name="view-task-status">
                            <option value="todo">Todo</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                </div>
            </animated.div>
        ) : null)
    )
}

export default ViewTask;