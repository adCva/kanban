import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { RiDeleteBack2Line } from "react-icons/ri";


function AddTask() {
    const [showAddTaskModal, setShowAddTaskModal] = useState(true);

    const transition = useTransition(showAddTaskModal, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });  


    return (
        transition((style, showAddTaskModal) => showAddTaskModal ? (
            <animated.div style={style} className='add-task-wrapper'>
                <div className='add-task-container'>
                    <h1>Add Task</h1>
                    <form className='add-form'>

                        <div className='form-group'>
                            <label>Title</label>
                            <input type='text' placeholder='e.g. Take coffe break'/>
                        </div>

                        <div className='form-group'>

                        </div>

                        <div className='subtasks-container'>

                        </div>

                        <div className='form-group'>

                        </div>

                        <button type='submit'>Create Task</button>
                    </form>
                </div>
            </animated.div>
        ) : null)
    )
}

export default AddTask;