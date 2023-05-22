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

    }
});

export const {  } = boards.actions;

export default boards.reducer;