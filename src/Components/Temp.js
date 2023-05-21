import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { closeAddTask } from "../Redux/ux";
// ===== React Icons.
import { RiDeleteBack2Line } from "react-icons/ri";

function Temp() {
  const dispatch = useDispatch();

  // ===== Redux state.
  const isAddTaskCardActive = useSelector((state) => state.ux.isAddTask);
  const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);

  // ===== Local state.
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskPlaceholder, setSubtaskPlaceholder] = useState(["e.g. Drik coffee.", "e.g. Cope with life absurdity.", "e.g. Stare into the abyss"]);

  // ===== React Spring Transition.
  const transition = useTransition(isAddTaskCardActive, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
  });

  // ===== Add Subtask Field Input.
  const addSubTaskInput = () => {
    if (subtasks.length < 3) setSubtasks([...subtasks, {subtaskName: "", isComplete: false}])
  };

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

          <form className='add-form'>

            <div className='form-group'>
              <label>Title</label>
              <input type='text' placeholder='e.g. Take coffe break' />
              <p>This fiels is required.</p>
            </div>

            <div className='form-group'>
              <label>Description</label>
              <textarea placeholder="e.g. It's always good to take a break. This 15 minutes break will recharge the batteries a little." ></textarea>
              <p>This fiels is required.</p>
            </div>

            <div className='subtasks-container'>
              <label>Subtasks</label>
              {subtasks ? subtasks.map((el, i) => {
                return (
                  <div key={i} className='subtask-interactive'>
                    <input type='text' name='subtaskName' value={el.subtaskName} placeholder={subtaskPlaceholder[i]} />
                    <button type='button' onClick={() => deleteSubtaskInput(i)} ><RiDeleteBack2Line /></button>
                  </div>
                )
              }) : null}
              <button type='button' onClick={addSubTaskInput} className='add-subtask-btn'>+ Add New Subtask</button>
            </div>

            <div className='form-group'>
              <label>Status</label>
              <select name="status" >
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

export default Temp;