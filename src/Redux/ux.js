import { createSlice } from '@reduxjs/toolkit';

export const ux = createSlice({
    name: "User Experience",
    initialState: {
        isDarkTheme: true,
        isSidebarHidden: false,
        activeBoard: "Platform Launch",
        isAddTask: false,
        isNewBoardPopup: false,
        editBoardPop: false
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
        },
        openNewBoardPop: (state) => {
            state.isNewBoardPopup = true;
        },
        closeNewBoardPop: (state) => {
            state.isNewBoardPopup = false;
        },
        openEdit: (state) => {
            state.editBoardPop = true;
        },
        closeEdit: (state) => {
            state.editBoardPop = false;
        },
        updateCurrentBoard: (state, action) => {
            state.activeBoard = action.payload.newName;
        }
    }
});


export const { toggleDarkTheme, hideSidebar, showSidebar, setActiveBoard, openAddTask, closeAddTask, openNewBoardPop, closeNewBoardPop, openEdit, closeEdit, updateCurrentBoard } = ux.actions;

export default ux.reducer;