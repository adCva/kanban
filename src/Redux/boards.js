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
    }
});

export const { createBoard, editBoard, addSubtask } = boards.actions;

export default boards.reducer;