const ignoreAddIfOddMiddleware = (storeAPI) => (next) => (action) => {
  // TODO This middleware should look for "ADD_5" actions, and when it sees one, check
  // TODO the current state.  If `state.counter` is odd, the middleware should ignore
  // TODO the action entirely, and prevent it from going onwards.

  // Remember that `storeAPI` has the `getState` method available.

  if (action.type === "ADD_5" && storeAPI.getState().counter % 2 !== 0) {
    return action;
  }
  return next(action);
};

export default ignoreAddIfOddMiddleware;
