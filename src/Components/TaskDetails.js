import React, { useState, useEffect, useRef } from 'react';
import { useTransition, animated } from '@react-spring/web';

function TaskDetails() {
    const [showModal, setShowModal] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [subtasks, setSubtasks] = useState([{subtaskName: "#1", isComplete: false}, {subtaskName: "#2", isComplete: true}]);
    const dropdownRef = useRef(null);

    const closeModalOutsideClick = (event) => {
        if (showModal && event.target.className === "task-details-wrapper") {
            setShowModal(false);
          }
    };

    const closeDropdownOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    const transition = useTransition(showModal, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });  

    useEffect(() => {
        document.addEventListener("click", closeModalOutsideClick);
        document.addEventListener("click", closeDropdownOutsideClick);

        return() => {
            document.removeEventListener("click", closeModalOutsideClick);
            document.removeEventListener("click", closeDropdownOutsideClick);
        }
    }, []);


    const markSubtask = (i) => {
        let tempArray = [...subtasks];
        let tempEl = tempArray[i];
        tempEl.isComplete = !tempEl.isComplete;
        tempArray.splice(i, 1, tempEl);
        setSubtasks([...tempArray])
        // console.log(tempEl.isComplete);
    } 


    return (
        transition((style, showModal) => showModal ? (
            <animated.div style={style} className='task-details-wrapper'>
                <div className='task-details-container'>
                    <div>
                        <h1>Board Name</h1>
                        <div className='dropdown-wrapper' ref={dropdownRef}>
                            <button type='button' onClick={() => setShowDropdown(!showDropdown)}>Click Me</button>
                            <div className={showDropdown ? "dropdown-container" : "dropdown-container dropdown-container-hide"} >
                                <button type='button'>Edit</button>
                                <button type='button'>Delete</button>
                            </div>
                        </div>
                    </div>
                    <h2>Board description</h2>
                    <div className='form-group'>
                        <p>Subtasks</p>
                        {subtasks.map((el, i) => {
                            return (
                                <label className='subtask-checkbox' for="checkbox-id" key={i}>
                                    {el.isComplete ? (
                                        <div>
                                            <input type='checkbox' checked id='checkbox-id' onChange={() => markSubtask(i)}/>
                                            <del>{el.subtaskName}</del>
                                        </div>  
                                    ) : (
                                        <div>
                                            <input type='checkbox' id='checkbox-id' onChange={() => markSubtask(i)}/>
                                            <p>{el.subtaskName}</p>
                                        </div>  
                                    )}
                                </label>
                            )
                        })}
                    </div>
                    <div className='form-group'>
                        <p>Status</p>
                        <select name="status">
                            <option value="todo">Todo</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <button type='submit'>Save Changes</button>
                </div>
            </animated.div>
        ) : null)
    )
}

export default TaskDetails;