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
                        subtasks: [
                            {
                                subtask_name: "Lorem ipsum #1",
                                subtask_status: "complete"
                            },
                            {
                                subtask_name: "Lorem ipsum #2",
                                subtask_status: "incomplete"
                            }
                        ],
                        task_status: "todo"
                    },
                    {
                        task_title: "Add search endpoints",
                        subtasks: [],
                        task_status: "doing"                    
                    },
                    {
                        task_title: "Add account management endpoints",
                        subtasks: [],
                        task_status: "doing"                    
                    },
                    {
                        task_title: "Conduct 5 wireframe tests.",
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
                        subtasks: [],
                        task_status: "todo"
                    },
                    {
                        task_title: "Build UI for search",
                        subtasks: [],
                        task_status: "doing"
                    },
                    {
                        task_title: "Create wireframe prototype.",
                        subtasks: [],
                        task_status: "done"
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