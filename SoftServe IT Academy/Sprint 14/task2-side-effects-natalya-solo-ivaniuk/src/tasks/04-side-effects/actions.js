import { fetchAmount } from "./api";

export function increment() {
  return { type: "INCREMENT" };
}

export function amountRequestSucceeded(amount) {
  return { type: "AMOUNT_REQUEST_SUCCEEDED", amount };
}

export function amountRequestFailed(error) {
  return { type: "AMOUNT_REQUEST_FAILED", error };
}

export function incrementThreeTimes() {
  return (dispatch) => {
    dispatch(increment());
    dispatch(increment());
    dispatch(increment());
  };
}

export function dispatchIncrementIfEven() {
  return (dispatch, getState) => {
    if (getState().counter % 2 === 0) dispatch(increment());
  };
}

export function fetchAndLoadAmount() {
  return (dispatch) => {
    // TODO This thunk needs to call the `fetchAmount()` API function imported above, and handle
    // TODO the promise it returns.  If the promise succeeds, the thunk should dispatch `requestAmountSucceeded()`
    // TODO with the returned amount.  If it fails, dispatch `requestAmountFailed()` instead with the error.
    fetchAmount()
      .then((res) => {
        dispatch(amountRequestSucceeded(res));
      })
      .catch((err) => dispatch(amountRequestFailed(err)));
  };
}
