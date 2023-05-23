import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { closeAddTask } from "../Redux/ux";
import { addSubtask } from "../Redux/boards";
// ===== React Icons.
import { MdClose } from "react-icons/md";

function AddTask() {
  const dispatch = useDispatch();

  // ===== Redux state.
  const isAddTaskCardActive = useSelector((state) => state.ux.isAddTask);
  const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);
  const activeBoard = useSelector((state) => state.ux.activeBoard);
  const boards = useSelector((state) => state.boards.boards);

  // ===== Local state.
  const [subtasks, setSubtasks] = useState([]);
  const subtaskPlaceholder = ["e.g. Drik coffee.", "e.g. Cope with life absurdity.", "e.g. Stare into the abyss"];
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("to do");

  // ===== React Spring Transition.
  const transition = useTransition(isAddTaskCardActive, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  // ===== Add Subtask Field Input.
  const addSubTaskInput = () => {
    if (subtasks.length < 3) setSubtasks([...subtasks, {subtask_name: "", isComplete: false}])
  };

  // ===== Edit Subtask Field Input.
  const addInputText = (i, event) => {
    let tempArray = [...subtasks];
    let tempFile = tempArray[i];
    let tempInput = event.target.value
    tempFile.subtask_name = tempInput

    tempArray.splice(i, 1, tempFile);
    setSubtasks([...tempArray]);
  }

  // ===== Delete Subtask Field Input.
  const deleteSubtaskInput = (i) => {
    let tempArray = [...subtasks];
    tempArray.splice(i, 1);
    setSubtasks([...tempArray]);
  };

  // ===== Close addTask modal on outside click.
  const closeAddTaskModalOutsideClick = (event) => {
    if (isAddTaskCardActive && event.target.className === "add-task-wrapper") {
      dispatch(closeAddTask());
    }
  }

  // ===== Handle form submit.
  const handleSubmit = (e) => {
    e.preventDefault();

    let formData = {
      task_title: title,
      task_desc: desc,
      task_status: status,
      subtasks: [...subtasks]
    }

    dispatch(addSubtask({boardName: activeBoard, objectData: formData}));
    resetData();
    dispatch(closeAddTask());
  }

  // ===== Reset local state.
  const resetData = () => {
    setTitle("");
    setSubtasks([]);
    setDesc("");
    setStatus("to do");
  }

  // ===== Use Effect.
  useEffect(() => {
    document.addEventListener("click", closeAddTaskModalOutsideClick);

    return() => {
      document.removeEventListener("click", closeAddTaskModalOutsideClick);
    }
  });


  return (
    transition((style, isAddTaskCardActive) => isAddTaskCardActive ? (
      <animated.div style={style} className={isAddTaskCardActive ? "add-task-wrapper" : "add-task-wrapper add-task-wrapper-hide"}>
        <div className={isDarkTheme ? "add-task-container" : "add-task-container add-task-container-light"}>

          <h1>Add Task</h1>

          <form className='add-form' onSubmit={handleSubmit}>

            <div className='form-group'>
              <label>Title</label>
              <input type='text' placeholder='e.g. Take coffe break' onChange={(e) => setTitle(e.target.value)} />
              <p className='error'>This fiels is required.</p>
            </div>

            <div className='form-group'>
              <label>Description</label>
              <textarea placeholder="e.g. It's always good to take a break. This 15 minutes break will recharge the batteries a little." onChange={(e) => setDesc(e.target.value)} ></textarea>
              <p className='error'>This fiels is required.</p>
            </div>

            <div className='subtasks-container'>
              <label>Subtasks</label>
              {subtasks ? subtasks.map((el, i) => {
                return (
                  <div key={i} className='subtask-interactive'>
                    <input type='text' name='subtaskName'  placeholder={subtaskPlaceholder[i]} onChange={(e) => addInputText(i, e)} />
                    <button type='button' onClick={() => deleteSubtaskInput(i)} ><MdClose /></button>
                  </div>
                )
              }) : null}
              <button type='button' onClick={addSubTaskInput} className='add-subtask-btn'>+ Add New Subtask</button>
            </div>

            <div className='form-group'>
              <label>Status</label>
              <select name="status" onChange={(e) => setStatus(e.target.value)} >
                <option value="to do" selected>Todo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>

            <button type='submit' className='submit-btn'>Create Task</button>

          </form>

        </div>
      </animated.div>
    ) : null)
  )
}

export default AddTask;