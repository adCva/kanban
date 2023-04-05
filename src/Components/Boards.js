import React, { useState } from 'react';

function Boards() {
    const [tasks, setTasks] = useState({});
    
    return (
        <div className='tasks-wrapper'>
            <div className='tasks-container'>
                {tasks ? (
                    <div>
                        <h1>Todo</h1>
                        <h1>Doing</h1>
                        <h1>Done</h1>
                    </div>
                ) : (
                    <div className='no-tasks'>
                        <h1>You don't have any boards!</h1>
                        <button>+ Create New Board</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Boards;