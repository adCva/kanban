import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';
import { closeNewBoardPop } from "../Redux/ux";
import { createBoard } from "../Redux/boards";

function NewBoard() {
    const dispatch = useDispatch();

    // ===== Redux state.
    const isNewBoardPopup = useSelector((state) => state.ux.isNewBoardPopup);
    const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);

    // ===== Local state.
    const [name, setName] = useState([]);
    const [newStatuses, setNewStatuses] = useState([]);
    const [allStatuses, setAllStatuses] = useState([]);

    // ===== Add Custom Status Input Field.
    const addCustomStatusInput = () => {
        if (newStatuses.length < 3) setNewStatuses([...newStatuses, {name: ""}]);
    }

    // ===== React Spring Transition.
    const transition = useTransition(isNewBoardPopup, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    // ===== Close addTask modal on outside click.
    const closeAddTaskModalOutsideClick = (event) => {
        if (isNewBoardPopup && event.target.className === "newBoard-wrapper") {
            dispatch(closeNewBoardPop());
        }
    }

    // ===== Add Value to new Status Input.
    const addInputText = (event, i) => {
        let tempStatusesArray = [...newStatuses];
        let tempStatusFile = tempStatusesArray[i];
        tempStatusFile.name = event.target.value

        tempStatusesArray.splice(i, 1, tempStatusFile);
        setNewStatuses(tempStatusesArray)
    }

    // ===== Add Value to new Status Input.
    const deleteInputText = (i) => {
        let tempNonDeleteArray = [...newStatuses];
        tempNonDeleteArray.splice(i, 1);

        setNewStatuses(tempNonDeleteArray)
    }

    // ===== Add to status array.
    const addToAllStatusArray = (el) => {
        if (allStatuses.includes(el)) {
            let tempArray = [...allStatuses];
            tempArray.splice(tempArray.indexOf(el), 1);

            setAllStatuses(tempArray);
        } else {
            setAllStatuses([...allStatuses, el]);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let newObj = {
            name: name,
            tasks: [],
            avaiableStatuses: [...allStatuses, ...newStatuses.map(el => el.name)]
        }

        dispatch(createBoard({newBoard: newObj}));
        dispatch(closeNewBoardPop());
    }


    // ===== Use Effect.
    useEffect(() => {
        document.addEventListener("click", closeAddTaskModalOutsideClick);

        return() => {
        document.removeEventListener("click", closeAddTaskModalOutsideClick);
        }
    });


    return (
        transition((style, isNewBoardPopup) => isNewBoardPopup ? (
            <animated.div style={style} className={isNewBoardPopup ? "newBoard-wrapper" : "newBoard-wrapper newBoard-wrapper-hide"}>
                <div className={isDarkTheme ? "newBoard-container" : "newBoard-container newBoard-container-light"}>
                    <h1>Add Board</h1>

                    <form className='board-form' onSubmit={handleSubmit}>

                        <div className='form-group'>
                            <label>Board Name: </label>
                            <input type="text" placeholder='Board Name' value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        <div className='form-group'>
                            <label>Board Available Statuses</label>

                            <div className='checkbox-group'>
                                <label>Todo</label>
                                <input type="checkbox" onChange={() => addToAllStatusArray("todo")}/>
                            </div>

                            <div className='checkbox-group'>
                                <label>Doing</label>
                                <input type="checkbox" onChange={() => addToAllStatusArray("doing")}/>
                            </div>

                            <div className='checkbox-group'>
                                <label>Done</label>
                                <input type="checkbox" onChange={() => addToAllStatusArray("done")}/>
                            </div>

                            <div className='custom-status-group'>
                                {newStatuses.map((el, i) => {
                                    return (
                                        <div key={i} className='custom-status-input-container' >
                                            <input type="text" onChange={(e) => addInputText(e, i)} value={el.name} placeholder='Status Name' />
                                            <button type='button' onClick={() => deleteInputText(i)}>X</button>
                                        </div>
                                    )
                                })}
                                <button type='button' onClick={addCustomStatusInput}>Add Custom Status</button>
                            </div>



                        </div>

                        <button type='submit' className='board-form-submit'>+ Create Board</button>

                    </form>

                </div>
            </animated.div>
        ) :null)
    )
}

export default NewBoard;


/*
                           {newStatuses.map((el, i) => {
                                return (
                                    el.isVisible ? (
                                        <div className='custom-status-input-container' key={i} >
                                            <input type="text" onChange={(e) => addInputText(e, i)} placeholder='Status Name' />
                                            <button type='button' onClick={() => deleteInputText(i)}>X</button>
                                        </div>
                                    ) : null
                                )
                            })}



                                        return {
                ...state,
                state: updatedState
            }
                            */


