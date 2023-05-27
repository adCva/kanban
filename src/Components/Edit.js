import React, {useState, useEffect} from 'react';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { updateSubtasks } from "../Redux/boards";


function Edit(obj, statuses) {
    const dispatch = useDispatch();

    const activeBoard = useSelector((state) => state.ux.activeBoard);
    const boards = useSelector((state) => state.boards.boards.filter(el => el.name === activeBoard)[0]);

    const [name, setName] = useState(obj.obj.task_title);
    const [desc, setDesc] = useState(obj.obj.task_desc);
    const [status, setStatus] = useState(obj.obj.task_status);
    const [subtasks, setSubtasks] = useState(obj.obj.subtasks);

    const loadData = () => {
        setName(obj.obj.task_title);
        setDesc(obj.obj.task_desc);
        setStatus(obj.obj.task_status);
        setSubtasks(obj.obj.subtasks);
    }

    const handleSubtaskEdit = (e, index) => {
        console.log(e.target.value)
        const updatedArray = subtasks.map((item, i) => {
            if (i === index) {
                return {
                    subtask_name: e.target.value,
                    isComplete: item.isComplete
                }
            }
            return item;
        })
        
        setSubtasks(updatedArray);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        let obj = {
            task_title: name,
            task_status: status,
            task_desc: desc,
            subtasks: subtasks
        }

        dispatch(updateSubtasks({changeBoard: activeBoard, newObj: obj}))
    }

    useEffect(() => {
        loadData();
        console.log(statuses)
    }, [obj])


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Name:</label>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label>Description:</label>
                    <textarea value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                </div>

                {subtasks.map((el, i) => {
                    return (
                        <div key={i}>
                            <input type="text" defaultValue={el.subtask_name} onChange={(e) => handleSubtaskEdit(e, i)}/>
                        </div>
                    )
                })}

                <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} >
                {boards.avaiableStatuses.map((el, i) => {
                  return (
                    <option key={i} value={el}>{el}</option>
                  )
                })}
              </select>

              <button type='submit'>Change</button>

            </form>
        </div>
    )
}

export default Edit;