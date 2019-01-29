class CounterState extends React.Component {
  state = { counter: 0 };

  componentDidMount() {
    this.reset();
  }

  componentWillReceiveProps() {
    this.increment();
  }

  reset = () => this.setState({ counter: 0 });

  increment = (amount = 1) => {
    const { counter } = this.state;
    this.setState({ counter: counter + amount });
  };

  decrement = (amount = 1) => {
    const { counter } = this.state;
    this.setState({ counter: counter - amount });
  };

  render() {
    const { children: fn } = this.props;
    const { counter } = this.state;
    if (fn instanceof Function) {
      return children({
        reset: this.reset,
        increment: this.increment,
        decrement: this.decrement,
        counter: counter,
      });
    }
    throw new Error('children props in not a function');
  }
}

const StatelessComponent = ({ counter, increment, decrement, reset }) => (
  <div>
    counter: {counter}
    <button onClick={increment}>increment</button>
    <button onClick={decrement}>decrement</button>
    <button onClick={reset}>reset</button>
  </div>
);

export default (
  <CounterState>
    {props => {
      // here behavior of props for this components can be customized
      return <StatelessComponent {...props} />;
    }}
  </CounterState>
);
