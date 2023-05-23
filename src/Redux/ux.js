import { createSlice } from '@reduxjs/toolkit';

export const ux = createSlice({
    name: "User Experience",
    initialState: {
        isDarkTheme: true,
        isSidebarHidden: false,
        activeBoard: "Platform Launch",
        isAddTask: false,
        isNewBoardPopup: false
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
        openAddTask: (state) => {
            state.isAddTask = true
        },
        closeAddTask: (state) => {
            state.isAddTask = false
        }
    }
});


export const { toggleDarkTheme, hideSidebar, showSidebar, setActiveBoard, openAddTask, closeAddTask } = ux.actions;

export default ux.reducer;