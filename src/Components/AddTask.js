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
                Test
            </animated.div>
        ) : null)
    )
}

export default AddTask;