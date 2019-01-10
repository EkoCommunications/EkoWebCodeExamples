# Stateful code examples

[back to index](../)

Please make sure that your component does the following:

- has a `state`
- `state` contains `myTestProp`
- `myTestProp` is set to 0 on `componentWillMount`
- `myTestProp` is incremented on each `componentWillReceiveProps`
- a `reset` function is passed to the children which allows resetting `myTestProp` to 0
- a `decrement` function is passed to the children which allows decrementing `myTestProp`
- an `increment` function is passed to the children which allows incrementing `myTestProp`
