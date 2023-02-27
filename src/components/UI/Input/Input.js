import React from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});
/* the spread operator is a faster way to get all the properties out of the input object */
// to make the ref work inside MealItemForm.js, since Input is a custom form, we need to call it in this component
// this is done by wrapping the component in React.forwardRef

export default Input;
