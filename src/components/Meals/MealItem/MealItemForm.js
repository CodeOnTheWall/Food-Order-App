import { useRef, useState } from "react";

import Input from "../../UI/Input/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    // with useRef its always .current, and this value is always a string, hence why we force conversion it (+)
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      // || is the OR
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
      // if any of these have been met, then we return and stop the function execution
    }

    props.onAddToCart(enteredAmountNumber);
    // sending MealItem.js our enteredAmounNumer, which is amountInputRef.current.value;
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
      {/* state and conditional rendering */}
    </form>
  );
};

// to make refs work on custom components, we have to go to the component where we want to recieve refs

export default MealItemForm;
