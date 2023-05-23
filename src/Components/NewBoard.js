import React, { useState, useRef, useEffect } from 'react';
// ===== Redux.
import { useSelector, useDispatch } from 'react-redux';


function NewBoard() {
    const dispatch = useDispatch();

    // ===== Redux state.
    const isNewBoardPopup = useSelector((state) => state.ux.isNewBoardPopup);
    const isDarkTheme = useSelector((state) => state.ux.isDarkTheme);

    // ===== Local state.
    const [newStatuses, setNewStatuses] = useState([]);
    const [allStatuses, setAllStatuses] = useState([]);

    // ===== Add Custom Status Input Field.
    const addCustomStatusInput = () => {
        if (newStatuses.length < 3) setNewStatuses([...newStatuses, {name: ""}])
    }

    // ===== Add Value to new Status Input.
    const addInputText = (event, i) => {
        /*
        let tempStatusesArray = [...newStatus];
        let tempStatusFile = tempStatusesArray[tempStatusesArray.indexOf(i)];
        let inputValue = event.target.value;
        tempStatusFile.name = inputValue

        tempStatusesArray.splice(i, 1, tempStatusFile);
        setNewStatus([...tempStatusesArray]);
        */
    }

    // ===== Add Value to new Status Input.
    const deleteInputText = (el) => {
        let tempArray = [...newStatuses];
        console.log(tempArray.indexOf(el))
        tempArray.splice(tempArray.indexOf(el), 1);
        setNewStatuses([...tempArray]);
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


    return (
        <div className={isNewBoardPopup ? "newBoard-wrapper" : "newBoard-wrapper newBoard-wrapper-hide"}>
            <div className={isDarkTheme ? "newBoard-container" : "newBoard-container newBoard-container-light"}>
                <h1>Add Board</h1>

                <form className='board-form'>

                    <div className='form-group'>
                        <label>Board Name: </label>
                        <input type="text" placeholder='Board Name' />
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
                            {newStatuses ? newStatuses.map((el, i) => {
                                return (
                                    <div className='custom-status-input-container' key={i} >
                                        <input type="text" onChange={(e) => addInputText(e, i)} placeholder='Status Name' />
                                        <button type='button' onClick={() => deleteInputText(el)}>X</button>
                                    </div>
                                )
                            }) : null}
                            <button type='button' onClick={addCustomStatusInput}>Add Custom Status</button>
                        </div>

                    </div>

                    <button type='submit' className='board-form-submit'>+ Create Board</button>

                </form>

            </div>
        </div>
    )
}

export default NewBoard;