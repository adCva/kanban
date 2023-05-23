import { createSlice } from '@reduxjs/toolkit';

export const boards = createSlice({
    name: "boards",
    initialState: {
        boards: [
            {
                name: "Platform Launch",
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
                tasks: []
            }
        ]
    },

    reducers: {
        createBoard: (state, action) => {
            console.log("create board");
        },
        addSubtask: (state, action) => {
            // let tempBoardsArray = state.boards.map(el => {return {...el}});
            // let singleBoardObj = tempBoardsArray.filter(el => el.name === action.payload.boardName);

            let tempBoardsArray = JSON.parse(JSON.stringify(state.boards));
            let singleBoardObj = tempBoardsArray.filter(el => el.name === action.payload.boardName);
            let tempTasksArray = [...singleBoardObj[0].tasks, action.payload.objectData];

            singleBoardObj[0].tasks = tempTasksArray
            tempBoardsArray.splice(tempBoardsArray.indexOf(singleBoardObj[0]), 1, singleBoardObj[0]);

            return {
                ...state,
                boards: tempBoardsArray
            }
        }
    }
});

export const { createBoard, addSubtask } = boards.actions;

export default boards.reducer;