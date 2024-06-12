import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementByAmount, reset } from '../redux/features/reducers/counterSlice';

export default function Counter() {
    const count = useSelector(state=>state.counter.count);
    
    const dispatch = useDispatch();

    return (
    <div>
        <h4>Counter:{count}</h4>
        <div style={{display:'flex',flexDirection:'row',gap:10,justifyContent:'center'}}>
            <button onClick={()=>dispatch(increment())}>Increment</button>
            <button onClick={()=>dispatch(decrement())}>Decrement</button>
            <button onClick={()=>dispatch(reset())}>Reset</button>
            <button onClick={()=>dispatch(incrementByAmount(10))}>IncrementByValue</button>
        </div>
    </div>
  );
};
