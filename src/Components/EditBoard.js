import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentBoard, closeEdit } from "../Redux/ux";
import { editBoard } from "../Redux/boards";


function EditBoard() {
    const dispatch = useDispatch();

    // ===== Redux state.
    const isEditBoardPopup = useSelector((state) => state.ux.editBoardPop);
    const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);

    // ===== Local state.
    const currentActiveBoard = useSelector((state) => state.ux.activeBoard);
    const [name, setName] = useState(currentActiveBoard);
    
    const board = useSelector((state) => state.boards.boards.filter(el => el.name === currentActiveBoard)[0]);

    
    let containsSubtasks = {};
    board.tasks.forEach(task => {
        const status = task.task_status;
        containsSubtasks[status] = (containsSubtasks[status] || 0) + 1;
    });

    const [statuses, setStatuses] = useState(board.avaiableStatuses.map(el => {
        return {
            name: el, 
            isActive: true,
            hasError: false,
            containsSubtasksWithThisStatus: containsSubtasks[el] || 0
        }
    }));        


    const selectStatusForDeletion = (i) => {
        let tempArray = [...statuses];
        if (board.tasks.filter(el => el.task_status === tempArray[i].name).length > 0) {
            tempArray[i].hasError = true;
            setStatuses(tempArray)
        } else if (tempArray[i].isActive === false) {
            tempArray[i].isActive = true;
            setStatuses(tempArray);
        } else {
            tempArray[i].isActive = false;
            setStatuses(tempArray)
        }
    }

    // ===== React Spring Transition.
    const transition = useTransition(isEditBoardPopup, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        let tempFilter = statuses.filter(el => el.isActive);

        dispatch(editBoard({originalName: currentActiveBoard, editedName: name, avaiableStatuses: tempFilter.map(el => el.name)}));
        dispatch(updateCurrentBoard({newName: name}));
        dispatch(closeEdit());
        setName(currentActiveBoard);
    }


    // ===== Close on outside click.
    const closeAddTaskModalOutsideClick = (event) => {
        if (isEditBoardPopup && event.target.className === "edit-board-wrapper") {
            dispatch(closeEdit());
        }
    }


    // ===== Use Effect.
    useEffect(() => {
        setName(currentActiveBoard);
        
        document.addEventListener("click", closeAddTaskModalOutsideClick);

        return() => {
        document.removeEventListener("click", closeAddTaskModalOutsideClick);
        }
    }, []);
    

    return (
        transition((style, isEditBoardPopup) => isEditBoardPopup ? (
            <animated.div style={style} className={isEditBoardPopup ? "edit-board-wrapper" : "edit-board-wrapper edit-board-wrapper-hide"}>
                <div className={isDarkTheme ? "edit-board-container" : "edit-board-container edit-board-container-light"}>
                    
                    <h1 onClick={() => console.log(currentActiveBoard, name)}>Edit Board</h1>

                    <form className='edit-board-form' onSubmit={handleSubmit}>

                        <div className='form-group'>
                            <label>Name: </label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className='edit-statuses'>
                            <label>Delete Statuses ?</label>
                            {statuses.map((el, i) => {
                                return (
                                    <div key={i}>
                                        {el.containsSubtasksWithThisStatus > 0 ? <p>X</p> : <input type='checkbox' id={`checkbox-${el.name}`} onChange={() => selectStatusForDeletion(i)}/>}
                                        {!el.isActive ? <del>{el.name}</del> : <label for={`checkbox-${el.name}`}>{el.name}</label>}
                                        {el.containsSubtasksWithThisStatus > 0 ? <p>This status has active subtasks. Please delete them first.</p> : null}
                                    </div>
                                )
                            })}
                        </div>

                        <button className='submit'>Edit Board</button>

                    </form>

                </div>
            </animated.div>
        ) : null)
    )
}

export default EditBoard;