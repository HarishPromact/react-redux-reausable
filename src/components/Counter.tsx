import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/redux";
import {
  createCounter,
  updateCounter,
} from "../redux/slices/counter/counterSlice";
import { CounterItem } from "../models/global";
import "../App.css";

export default function Counter() {
  const dispatch = useAppDispatch();
  const counters = useAppSelector((state) => state.counter.items);
  const addCounterCalled = useRef(false);

  /**
   * This method is used to add a new counter
   */
  const addCounter = () => {
    const newCounter: CounterItem = {
      id: counters.length + 1,
      value: 0,
    };
    dispatch(createCounter(newCounter));
  };

  /**
   * This function is used to increment or decrement the counter value
   * @param id counter id
   * @param value boolean value
   */
  const incrementCounter = (id: number, value: boolean) => {
    const counter = counters.find((c: CounterItem) => c.id === id);
    if (counter && value) {
      dispatch(updateCounter({ ...counter, value: counter.value + 1 }));
    } else if (counter && !value) {
      dispatch(updateCounter({ ...counter, value: counter.value - 1 }));
    }
  };

  /**
   * UseEffect
   */
  useEffect(() => {
    if (!addCounterCalled.current) {
      addCounter();
      addCounterCalled.current = true; 
    }
  }, []); 

  return (
    <div>
      <h1>Counter List</h1>
      <div className="flex-container">
        {counters.map((c: CounterItem) => (
          <div key={c.id} className="counter-value ">
            <span>Counter Value {c.value}</span>
            <div className="flex-container">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => incrementCounter(c.id, true)}
              >
                Increment
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => incrementCounter(c.id, false)}
              >
                Decrement
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
