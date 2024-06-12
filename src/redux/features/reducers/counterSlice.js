import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    count: 0
}
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) { state.count += 1 },
        decrement(state) { state.count -= 1 },
        incrementByAmount(state, action){ state.count += action.payload },
        reset(state) {  state.count = initialState.count; }
    }
});

export const { increment, decrement, reset, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;