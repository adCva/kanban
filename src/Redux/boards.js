import { createSlice } from '@reduxjs/toolkit';

export const boards = createSlice({
    name: "boards",
    initialState: {
        boards: [
            {
                name: "Platform Launch",
                avaiableStatuses: ["todo", "doing", "done"],
                tasks: [
                    {
                        task_title: "Build UI for onboarding flow",
                        task_desc: "",
                        subtasks: [
                            {
                                subtask_name: "Lorem ipsum #1",
                                isComplete: true
                            },
                            {
                                subtask_name: "Lorem ipsum #2",
                                isComplete: false
                            }
                        ],
                        task_status: "to do",
                    },
                    {
                        task_title: "Add search endpoints",
                        task_desc: "",
                        subtasks: [],
                        task_status: "doing"                    
                    },
                    {
                        task_title: "Add account management endpoints",
                        task_desc: "",
                        subtasks: [],
                        task_status: "doing"                    
                    },
                    {
                        task_title: "Conduct 5 wireframe tests.",
                        task_desc: "",
                        subtasks: [],
                        task_status: "done"
                    }
                ]
            },
            {
                name: "Marketing Plan",
                avaiableStatuses: ["todo", "doing", "done", "future"],
                tasks: [
                    {
                        task_title: "Build UI for onboarding",
                        task_desc: "",
                        subtasks: [],
                        task_status: "to do"
                    },
                    {
                        task_title: "Build UI for search",
                        task_desc: "",
                        subtasks: [],
                        task_status: "doing"
                    },
                    {
                        task_title: "Create wireframe prototype.",
                        task_desc: "",
                        subtasks: [],
                        task_status: "done"
                    },
                    {
                        task_title: "Create wireframe prototype.",
                        task_desc: "",
                        subtasks: [],
                        task_status: "idea"
                    },
                    {
                        task_title: "Conduct 5 wireframe tests.",
                        task_desc: "",
                        subtasks: [],
                        task_status: "terminator"
                    }
                ]
            },
            {
                name: "Roadmap",
                avaiableStatuses: ["todo", "doing", "done", "future", "ideas"],
                tasks: []
            }
        ]
    },

    reducers: {
        createBoard: (state, action) => {
            let tempBoardsArray = [...state.boards];
            tempBoardsArray.push(action.payload.newBoard);

            return {
                ...state,
                boards: tempBoardsArray
            }
        },
        editBoard: (state, action) => {
            
            let tempBoardsArray = JSON.parse(JSON.stringify(state.boards));
            let boardToEdit = tempBoardsArray.filter(el => el.name === action.payload.originalName);

            boardToEdit[0].name = action.payload.editedName;
            boardToEdit[0].avaiableStatuses = action.payload.avaiableStatuses;

            tempBoardsArray.splice(tempBoardsArray.indexOf(boardToEdit[0]), 1, boardToEdit[0]);

            return {
                ...state,
                boards: tempBoardsArray
            }
        },
        addSubtask: (state, action) => {
            let tempBoardsArray = JSON.parse(JSON.stringify(state.boards));
            let singleBoardObj = tempBoardsArray.filter(el => el.name === action.payload.boardName);
            let tempTasksArray = [...singleBoardObj[0].tasks, action.payload.objectData];

            singleBoardObj[0].tasks = tempTasksArray
            tempBoardsArray.splice(tempBoardsArray.indexOf(singleBoardObj[0]), 1, singleBoardObj[0]);

            return {
                ...state,
                boards: tempBoardsArray
            }
        },
        updateSubtasks: (state, action) => {
            let tempBoardsArray = JSON.parse(JSON.stringify(state.boards));
            let singleBoardObj = tempBoardsArray.filter(el => el.name === action.payload.changeBoard);
  
            let objectToBeChanged = singleBoardObj[0].tasks.map(item => {
                if (item.task_title === action.payload.newObj.task_title) {
                    return {
                        task_title: action.payload.newObj.task_title,
                        task_desc: action.payload.newObj.task_desc,
                        task_status: action.payload.newObj.task_status,
                        subtasks: [...action.payload.newObj.subtasks]
                    }
                }
                return item;
            })

            singleBoardObj[0].tasks = [...objectToBeChanged];
            tempBoardsArray.splice(tempBoardsArray.indexOf(singleBoardObj[0]), 1, singleBoardObj[0]);

            return {
                ...state,
                boards: tempBoardsArray
            }

        },
        deleteBoard: (state, action) => {
            let tempBoardsArray = JSON.parse(JSON.stringify(state.boards));
            let deleteBoardObj = tempBoardsArray.filter(el => el.name === action.payload.board);

            tempBoardsArray.splice(tempBoardsArray.indexOf(deleteBoardObj[0]), 1);

            return {
                ...state,
                boards: tempBoardsArray
            }
        },  
        deleteSubtask: (state, action) => {
            let tempBoardsArray = JSON.parse(JSON.stringify(state.boards));
            let deleteBoardObj = tempBoardsArray.filter(el => el.name === action.payload.deleteFromBoard);
            
            deleteBoardObj[0].tasks.splice(action.payload.index, 1);
            tempBoardsArray.splice(tempBoardsArray.indexOf(deleteBoardObj[0]), 1, deleteBoardObj[0]);

            return {
                ...state,
                boards: tempBoardsArray
            }
        }
    }
});

export const { createBoard, editBoard, addSubtask, updateSubtasks, deleteBoard, deleteSubtask } = boards.actions;

export default boards.reducer;