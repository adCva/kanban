import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { RiDeleteBack2Line } from "react-icons/ri";
// Redux.
import { useSelector, useDispatch } from 'react-redux';
import { toggleAddTask } from "../Redux/ux";


function AddTask() {
    const dispatch = useDispatch();
    const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);
    const isAddTaskModal = useSelector((state) => state.ux.isAddTask);
    // const [showModal, setShowModal] = useState(true);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("todo");
    const [subtasks, setSubtasks] = useState([]);
    const [errorLocation, setErrorLocation] = useState("");
    const [placeholder, setPlaceholder] = useState(["e.g. Drik coffee.", "e.g. Cope with life absurdity.", "e.g. Stare into the abyss"]);

    
    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (title === "" && desc === "") {
            setErrorLocation("all");
        } else if (title === "") {
            setErrorLocation("title");
        } else if (desc === "") {
            setErrorLocation("desc");
        } else {
            const formData = {
                title: title,
                description: desc,
                status: status,
                subtasks: subtasks
            };

            console.log(formData);
        }
    };

    const addSubTaskInput = () => {
        if (subtasks.length < 3) setSubtasks([...subtasks, {subtaskName: "", isComplete: false}])
    };


    const deleteSubtaskInput = (i) => {
       let tempArray = [...subtasks];
        tempArray.splice(i, 1);
        setSubtasks([...tempArray]);
    };


    const handleSubtaskInput = (e, i) => {
        let tempArray = [...subtasks];
        let el = tempArray[i];
        el.subtaskName = e.target.value;
        tempArray.splice(i, 1, el);
        setSubtasks([...tempArray]);
    };


    const closeModalOutsideClick = (event) => {
        //console.log(event.target.className);
        if (isAddTaskModal && event.target.className === "add-task-wrapper" || event.target.className === "add-task-wrapper add-task-wrapper-dark") {
            // setShowModal(false);
            dispatch(toggleAddTask());
            //console.log("outside click");
        }
    };


    const transition = useTransition(isAddTaskModal, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });  


    useEffect(() => {
        document.addEventListener("click", closeModalOutsideClick);

        return() => {
            document.removeEventListener("click", closeModalOutsideClick);
        }
    });


    return (
        transition((style, isAddTaskModal) => isAddTaskModal ? (
            <animated.div style={style} className={isDarkTheme ? "add-task-wrapper add-task-wrapper-dark" : "add-task-wrapper"}>
                <div className='add-task-container'>
                    <h1>Add Task</h1>
                    <form className='add-form'>

                        <div className='form-group'>
                            <label>Title</label>
                            <input type='text' placeholder='e.g. Take coffe break' onChange={(e) => setTitle(e.target.value)} />
                            <p>This fiels is required.</p>
                        </div>

                        <div className='form-group'>
                            <label>Description</label>
                            <textarea placeholder="e.g. It's always good to take a break. This 15 minutes break will recharge the batteries a little." onChange={(e) => setDesc(e.target.value)} ></textarea>
                            <p>This fiels is required.</p>
                        </div>

                        <div className='subtasks-container'>
                            <label>Subtasks</label>
                            {subtasks ? subtasks.map((el, i) => {
                                return (
                                    <div key={i} className='subtask-interactive'>
                                        <input type='text' name='subtaskName' value={el.subtaskName} placeholder={placeholder[i]} />
                                        <button type='button' onClick={() => deleteSubtaskInput(i)} ><RiDeleteBack2Line /></button>
                                    </div>
                                )
                            }) : null}
                            <button type='button' onClick={addSubTaskInput} className='add-subtask-btn'>+ Add New Subtask</button>
                        </div>

                        <div className='form-group'>
                            <label>Status</label>
                            <select name="status" onChange={(e) => setStatus(e.target.value)} >
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