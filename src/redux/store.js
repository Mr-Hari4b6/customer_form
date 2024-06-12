import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/reducers/counterSlice';

const store =  configureStore({
    reducer:{
        counter: counterReducer
    }
});

export default store;