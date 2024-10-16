import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice";
import timerReducer from '../features/timer/timerSlice';
import imageReducer from "../features/image/imageSlice";
import commentsReducer from "../features/comments/commentsSlice";


const store = configureStore({
    reducer: {
        todos: todoReducer, 
        timer: timerReducer,
        image: imageReducer,
        comments: commentsReducer
    }
});

export default store;
