import React, { useState, useEffect, useRef } from 'react';

function Tasks() {
    const [tasks, setTasks] = useState({});
    const [showDropdown, setShowDropdown] = useState(false);
    const [accordion, setAccordion] = useState([]);
    const dropdownRef = useRef(null);


    const closeDropdownOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };


    const handleAccordion = (el) => {
        console.log(el)
        setAccordion([...accordion, el])
    }

    useEffect(() => {
        document.addEventListener("click", closeDropdownOutsideClick);

        return() => {
            document.removeEventListener("click", closeDropdownOutsideClick);
        }
    });

    return (
        <div className='tasks-wrapper'>
            {/* ============= Top Bar, Only on Desktop ============= */}
            <div className='topbar-container'>
                <h1>Board Name</h1>
                <div className='topbar-interactive'>
                    <button>+ Add New Task</button>
                    <div className='dropdown-wrapper' ref={dropdownRef}>
                        <button type='button' onClick={() => setShowDropdown(!showDropdown)}>Click Me</button>
                        <div className={showDropdown ? "dropdown-container" : "dropdown-container dropdown-container-hide"} >
                            <button type='button'>Edit</button>
                            <button type='button'>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            {tasks ? (
                <div className='tasks-container'>
                    <div className='status-group'>
                        <h1 onClick={() => handleAccordion(1)}><span></span> Todo</h1>
                        <div className={accordion.includes(1) ? "status-cards-container" : "status-cards-container-hide"} >
                            <div className='task-card'>
                                <h2>Card title</h2>
                                <p>0 out of # subtasks</p>
                            </div>
                            <div className='task-card'>
                                <h2>Card title</h2>
                                <p>0 out of # subtasks</p>
                            </div>
                        </div>
                    </div>
                    <div className='status-group'>
                        <h1><span></span> Doing</h1>
                        <div className={accordion.includes(2) ? "status-cards-container" : "status-cards-container-hide"}>
                            <div className='task-card'>
                                <h2>Card title</h2>
                                <p>0 out of # subtasks</p>
                            </div>
                            <div className='task-card'>
                                <h2>Card title</h2>
                                <p>0 out of # subtasks</p>
                            </div>
                            <div className='task-card'>
                                <h2>Card title</h2>
                                <p>0 out of # subtasks</p>
                            </div>
                            <div className='task-card'>
                                <h2>Card title</h2>
                                <p>0 out of # subtasks</p>
                            </div>
                        </div>
                    </div>
                    <div className='status-group'>
                        <h1><span></span> Done</h1>
                        <div className={accordion.includes(3) ? "status-cards-container" : "status-cards-container-hide"}>
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
                    <h1>You don't have any boards!</h1>
                    <button>+ Create New Board</button>
                </div>
            )}
        </div>
    )
}

export default Tasks;