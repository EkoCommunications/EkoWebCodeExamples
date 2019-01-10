// Define a HOC which can be used to inject a custom state into a component
const StatefulComponentConstructor = (options = {}) => Component =>
  class GenericStatefulComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = options.initialState || {};

      // Effects make state changes
      if (options.effects instanceof Function) {
        this.effects = options.effects(this.setState, this.getState);
      }
    }

    /**
     * Returns either the full state,
     * or key from state if defined
     */
    getState(key = undefined) {
      if (key !== undefined) {
        return state[key];
      }

      return this.state;
    }

    render() {
      <Component {...this.effects} />;
    }
  };

function MyRenderComponent({ myTestProp }) {
  return <span>{myTestProp}</span>;
}

export default compose(
  // We need to call:
  // - reset on componentWillMount,
  // - increment on componentWillReceiveProps
  Lifecycle({
    willMount: ({ reset }) => reset(),
    willReceiveProps: ({ increment }) => increment(),
  }),

  // We'll define the stateful component here
  StatefulComponentConstructor({
    initialState: { myTestProp: 0 },

    // Effects change the state of the component
    effects: (setState, getState) => ({
      reset() {
        setState({ myTestProp: 0 });
      },
      increment(amount = 1) {
        setState({ myTestProp: this.getState('myTestProp') + amount });
      },
      deccrement(amount = 1) {
        setState({ myTestProp: this.getState('myTestProp') - amount });
      },
    }),
  }),
)(MyRenderComponent);