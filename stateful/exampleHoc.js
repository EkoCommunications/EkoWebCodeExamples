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
      <Component
        // Ensure that we always pass parent props to children
        {...this.props}
        // Injected props from this HOC
        {...this.state}
        {...this.effects}
      />;
    }
  };

// The above HOC could be moved to a separate file, and reused
// Below is the code which would actually render the stateful component
// ======================================================================

function MyRenderComponent({ myTestProp }) {
  return <span>{myTestProp}</span>;
}

export default compose(
  // We'll define the stateful component here
  StatefulComponentConstructor({
    initialState: { myTestProp: 0 },

    // Effects change the state of the component
    effects: (setState, getState) => ({
      reset() {
        setState({ myTestProp: 0 });
      },
      increment(amount = 1) {
        setState({ myTestProp: getState('myTestProp') + amount });
      },
      deccrement(amount = 1) {
        setState({ myTestProp: getState('myTestProp') - amount });
      },
    }),
  }),

  // We need to call:
  // - reset on componentWillMount,
  // - increment on componentWillReceiveProps
  // Refers to Lifecycle which can be found in eko-web-app
  Lifecycle({
    willMount: ({ reset }) => reset(),
    willReceiveProps: ({ increment }) => increment(),
  }),
)(MyRenderComponent);
