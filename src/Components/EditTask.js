import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';

function EditTask() {
    const [showModal, setShowModal] = useState(true);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("todo");
    const [subtasks, setSubtasks] = useState([]);
    const [errorLocation, setErrorLocation] = useState("none");

    const addSubTaskInput = () => {
        if (subtasks.length < 3) setSubtasks([...subtasks, {subtaskName: "", isComplete: false}])
        console.log(subtasks);
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
        if (showModal && event.target.className === "edit-task-wrapper") {
            setShowModal(false);
          }
    };

    const transition = useTransition(showModal, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });  


    const loadData = () => {
        // Fake incoming data.
        setTitle("Title");
        setDesc("Description");
        setStatus("doing");
        setSubtasks([...subtasks, {subtaskName: "add sugar", isComplete: false}]);
        console.log(title);
    };

    useEffect(() => {
        document.addEventListener("click", closeModalOutsideClick);
        window.addEventListener("load", loadData);

        return() => {
            document.removeEventListener("click", closeModalOutsideClick);
            window.removeEventListener("load", loadData);
        }
    });


    const handleSubmit = (event) => {
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
            setShowModal(false);
        }
    };


  return (
    transition((style, showModal) => showModal ? (
        <animated.div style={style} className='edit-task-wrapper'>
            <div className='edit-task-container'>
                <h1>Edit Task</h1>
                <form className='edit-form' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label>Title</label>
                        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <p className={errorLocation === "all" ? "show-error-msg" : errorLocation === "title" ? "show-error-msg" : "hide-error-msg"}>This fiels is required.</p>
                    </div>
                    <div className='form-group'>
                        <label>Description</label>
                        <textarea value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                        <p className={errorLocation === "all" ? "show-error-msg" : errorLocation === "desc" ? "show-error-msg" : "hide-error-msg"}>This fiels is required.</p>
                    </div>
                    <div className='form-group'>
                        <label>Subtasks</label>
                        {subtasks ? subtasks.map((el, i) => {
                            return (
                                <div key={i}>
                                    <input type='text' value={subtasks[i].subtaskName} onChange={(e) => handleSubtaskInput(e, i)}/>
                                    <button type='button' onClick={() => deleteSubtaskInput(i)} >X</button>
                                </div>
                            ) 
                        }) : null}
                        <button type='button' onClick={addSubTaskInput}>+ Add Subtask</button>
                    </div>
                    <div className='form-group'>
                        <label>Status</label>
                        <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="todo">Todo</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <button type='submit'>Save Changes</button>
                </form>
            </div>
        </animated.div>
    ) : null)
  )
}

export default EditTask;