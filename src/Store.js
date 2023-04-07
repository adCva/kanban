import { configureStore  } from '@reduxjs/toolkit';
import ux from "./Redux/ux";

export default configureStore({
    reducer: {
        ux: ux
    }
})