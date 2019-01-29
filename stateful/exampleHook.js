import { useState, useEffect } from 'react';

const counter = props => {
  const [counter, setCounter] = useState(0);

  reset = () => setCounter(0);

  increment = (amount = 1) => {
    setCounter(counter + amount);
  };

  decrement = (amount = 1) => {
    setCounter(counter + amount);
  };

  useEffect(reset, []); // analog componentDidMount
  useEffect(increment, [props]); // analog componentWillReceiveProps

  return { counter, reset, increment, decrement };
};

const StatelessComponent = ({ counter, increment, decrement, reset }) => (
  <div>
    counter: {counter}
    <button onClick={increment}>increment</button>
    <button onClick={decrement}>decrement</button>
    <button onClick={reset}>reset</button>
  </div>
);

export default props => {
  return <StatelessComponent {...counter(props)} {...props} />;
};
