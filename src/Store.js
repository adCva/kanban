import { configureStore  } from '@reduxjs/toolkit';
import ux from "./Redux/ux";
import boards from "./Redux/boards";

export default configureStore({
    reducer: {
        ux: ux,
        boards: boards
    }
})