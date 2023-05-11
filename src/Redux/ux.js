import { createSlice } from '@reduxjs/toolkit';

export const ux = createSlice({
    name: "User Experience",
    initialState: {
        isDarkTheme: true,
        isSidebarHidden: false,
        activeBoard: "Platform Launch",
        isAddTask: false
    },

    reducers: {
        toggleDarkTheme: (state) => {
            console.log(state.isDarkTheme)
            state.isDarkTheme = !state.isDarkTheme
        },
        hideSidebar: (state) => {
            console.log(state.isSidebarHidden)
            state.isSidebarHidden = true;
        },
        showSidebar: (state) => {
            state.isSidebarHidden = false;
        },
        setActiveBoard: (state, action) => {
            state.activeBoard = action.payload;
        },
        toggleAddTask: (state) => {
            console.log(state.isAddTask);
            state.isAddTask = true
        }
    }
});


export const { toggleDarkTheme, hideSidebar, showSidebar, setActiveBoard, toggleAddTask } = ux.actions;

export default ux.reducer;