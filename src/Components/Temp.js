import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { toggleDetailsPopActive } from "../Redux/ux";

function Temp() {
    const dispatch = useDispatch();

    // ===== Redux state.
    const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);
    const showThisPopup = useSelector((state) => state.ux.isDetailsPopActive);
    const showDetailsFor = useSelector((state) => state.ux.showDetailsFor);
    const board = useSelector((state) => state.boards.boards);

    // ===== Local state.
    const [taskDetails, setTaskDetails] = useState({});


    // ===== React Spring Transition.
    const transition = useTransition(showThisPopup, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    // ===== Close edit/delete dropdown.
    const closeTasksDropdownOutsideClick = (event) => {
        console.log("test")
        if (showThisPopup && event.target.className === "task-details-wrapper") {
            dispatch(toggleDetailsPopActive());
        }
    };

    useEffect(() => {
        setTaskDetails(showDetailsFor.board !== "" ? board.filter(el => el.name === showDetailsFor.board)[0].tasks[showDetailsFor.taskId] : {name: "test"})

        document.addEventListener("click", closeTasksDropdownOutsideClick);

        return () => {
            document.removeEventListener("click", closeTasksDropdownOutsideClick);
        }
    }, []);

    return (
        transition((style, showThisPopup) => showThisPopup ? (
            <animated.div style={style} className={showThisPopup ? "task-details-wrapper" : "task-details-wrapper task-details-wrapper-hide"} >
                <div className={isDarkTheme ? "task-details-container" : "task-details-container task-details-container-light"}>
                    <h1 onClick={() => console.log(taskDetails)} >test</h1>
                    <h1>{taskDetails.task_title}</h1>
                    <p>{taskDetails.task_desc}</p>

                    <div>
                        <label>Current Status:</label>
                        <select>
                            <option></option>
                        </select>
                    </div>
                </div>
            </animated.div>
        ) : null)
    )
}

export default Temp;