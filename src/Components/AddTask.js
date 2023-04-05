import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { RiDeleteBack2Line } from "react-icons/ri";

function AddTask() {
    const [showModal, setShowModal] = useState(true);
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
        if (showModal && event.target.className === "add-task-wrapper") {
            setShowModal(false);
          }
    };

    const transition = useTransition(showModal, {
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
        transition((style, showModal) => showModal ? (
            <animated.div style={style} className='add-task-wrapper'>
                <div className='add-task-container'>
                    <h1>Add Task</h1>
                    <form className='add-form' onSubmit={handleFormSubmit}>
                        <div className='form-group'>
                            <label>Title</label>
                            <input type='text' onChange={(e) => setTitle(e.target.value)} placeholder='e.g. Take coffe break'/>
                            <p className={errorLocation === "all" ? "show-error-msg" : errorLocation === "title" ? "show-error-msg" : "hide-error-msg"}>This fiels is required.</p>
                        </div>
                        <div className='form-group'>
                            <label>Description</label>
                            <textarea onChange={(e) => setDesc(e.target.value)} placeholder="e.g. It's always good to take a break. This 15 minutes break will recharge the batteries a little."></textarea>
                            <p className={errorLocation === "all" ? "show-error-msg" : errorLocation === "desc" ? "show-error-msg" : "hide-error-msg"}>This fiels is required.</p>
                        </div>
                        <div className='subtasks-container'>
                            <label>Subtasks</label>
                            {subtasks ? subtasks.map((el, i) => {
                                return (
                                    <div key={i}>
                                        <input type='text' name='subtaskName' onChange={(e) => handleSubtaskInput(e, i)} value={el.subtaskName} placeholder={placeholder[i]} />
                                        <button type='button' onClick={() => deleteSubtaskInput(i)}><RiDeleteBack2Line /></button>
                                    </div>
                                )
                            }) : null}
                            <button type='button' onClick={addSubTaskInput}>+ Add New Subtask</button>
                        </div>
                        <div className='form-group'>
                            <label>Status</label>
                            <select name="status" onChange={(e) => setStatus(e.target.value)}>
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