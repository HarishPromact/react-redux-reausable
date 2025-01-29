import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks/redux';
import { createCounter, deleteCounter, updateCounter } from '../redux/slices/counter/counterSlice';
import { CounterItem } from '../redux/slices/genericSlice';


const Counter: React.FC = () => {
  const dispatch = useAppDispatch();
  const counters = useAppSelector((state) => state.counter.items);

  const addCounter = () => {
    const newCounter: CounterItem = {
      id: counters.length + 1,
      value: 0
    };
    dispatch(createCounter(newCounter));
  };

  const incrementCounter = (id: number) => {
    const counter = counters.find((c: CounterItem) => c.id === id);
    if (counter) {
      dispatch(updateCounter({ ...counter, value: counter.value + 1 }));
    }
  };

  const deleteCounterItem = (id: number) => {
    dispatch(deleteCounter(id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Counter List</h1>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        onClick={addCounter}
      >
        Add Counter
      </button>
      <ul className="space-y-4">
        {counters.map((c: CounterItem) => (
          <li key={c.id} className="flex items-center space-x-4">
            <span className="text-lg">Counter {c.id}: {c.value}</span>
            <button 
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              onClick={() => incrementCounter(c.id)}
            >
              Increment
            </button>
            <button 
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => deleteCounterItem(c.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Counter;