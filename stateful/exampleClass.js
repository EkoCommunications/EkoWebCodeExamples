function MyRenderComponent({ myTestProp }) {
  return <span>{myTestProp}</span>;
}

class MyStatefulComponent extends React.Component {
  state = { myTestProp: 0 };

  componentDidMount() {
    this.reset();
  }

  componentWillReceiveProps() {
    this.increment();
  }

  reset = () => this.setState({ myTestProp: 0 });

  increment = (amount = 1) => {
    const { myTestProp } = this.state;
    this.setState({ myTestProp: myTestProp + amount });
  };

  decrement = (amount = 1) => {
    const { myTestProp } = this.state;
    this.setState({ myTestProp: myTestProp - amount });
  };

  render() {
    <MyRenderComponent
      reset={this.reset}
      increment={this.increment}
      decrement={this.decrement}
      myTestProp={myTestProp}
    />;
  }
}

export default MyStatefulComponent;
