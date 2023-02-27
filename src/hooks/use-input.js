import { useReducer } from "react";

const ACTIONS = {
  INPUT: "INPUT",
  BLUR: "BLUR",
  RESET: "RESET",
};

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  // action is the action dispatched
  if (action.type === ACTIONS.INPUT) {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === ACTIONS.BLUR) {
    return {
      isTouched: true,
      value: state.value,
    };
  }
  if (action.type === ACTIONS.RESET) {
    return {
      isTouched: false,
      value: "",
    };
  }
  return initialInputState;
};

const useInput = (validateValue) => {
  // this validateValue is the expected param to be passed in, which is either isNotEmpty or isSixChar from Checkout.js
  //   however this is a reusable form
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );
  // inputState is equal to initialInputState at the start

  const valueIsValid = validateValue(inputState.value);
  // once we get the returned inputState, then we use the passed in validation function to set if its valid
  const hasError = !valueIsValid && inputState.isTouched;
  // hasError starts at false since validIsValid starts at false, hence !validIsValid is truthy
  const valueChangeHandler = (event) => {
    dispatch({ type: ACTIONS.INPUT, value: event.target.value });
  };
  const inputBlurHandler = (event) => {
    dispatch({ type: ACTIONS.BLUR });
  };
  const reset = () => {
    dispatch({ type: ACTIONS.RESET });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};
// we return these values which get passed back to the components that are using the custom hook,
// after the custom hook assesses the passed in param from the components
// for example, isNotEmpty gets passed here (whether thats from onChange of onBlue)

export default useInput;
