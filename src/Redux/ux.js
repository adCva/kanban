import { createSlice } from '@reduxjs/toolkit';

export const ux = createSlice({
    name: "User Experience",
    initialState: {
        isDarkTheme: true,
        isSidebarHidden: false,
        activeBoard: "Platform Launch"
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
        }
    }
});


export const { toggleDarkTheme, hideSidebar, showSidebar, setActiveBoard} = ux.actions;

export default ux.reducer;