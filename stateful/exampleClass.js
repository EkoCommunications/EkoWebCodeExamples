function MyRenderComponent({ myTestProp }) {
  return <span>{myTestProp}</span>;
}

class MyStatefulComponent extends React.Component {
  state = { myTestProp: 0 };

  componentDidMount() {
    this.setState({ myTestProp: 0 });
  }

  componentWillReceiveProps() {
    this.increment();
  }

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
      myTestProp={myTestProp}
      increment={this.increment}
      decrement={this.decrement}
    />;
  }
}

export default MyStatefulComponent;
