import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { RiDeleteBack2Line } from "react-icons/ri";


function AddTask() {
    const [showAddTaskModal, setShowAddTaskModal] = useState(true);
    const [subtasks, setSubtasks] = useState([]);

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
                            <p>This fiels is required.</p>
                        </div>

                        <div className='form-group'>
                            <label>Description</label>
                            <textarea placeholder="e.g. It's always good to take a break. This 15 minutes break will recharge the batteries a little."></textarea>
                            <p>This fiels is required.</p>
                        </div>

                        <div className='subtasks-container'>
                            <label>Subtasks</label>
                            {subtasks ? subtasks.map((el, i) => {
                                return (
                                    <div key={i}>
                                        <input type='text' name='subtaskName' value={el.subtaskName} placeholder={placeholder[i]} />
                                        <button type='button'><RiDeleteBack2Line /></button>
                                    </div>
                                )
                            }) : null}
                            <button type='button' onClick={addSubTaskInput}>+ Add New Subtask</button>
                        </div>

                        <div className='form-group'>
                            <label>Status</label>
                            <select name="status">
                                <option value="todo" selected>Todo</option>
                                <option value="doing">Doing</option>
                                <option value="done">Done</option>
                            </select>
                        </div>

                        <button type='submit'>Create Task</button>
                    </form>
                </div>
            </animated.div>
        ) : null)
    )
}

export default AddTask;