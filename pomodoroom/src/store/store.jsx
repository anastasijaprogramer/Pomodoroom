import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice";
import timerReducer from '../features/timer/timerSlice';


const store = configureStore({
    reducer: {
        todos: todoReducer, 
        timer: timerReducer
    }
});

export default store;
