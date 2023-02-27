import { useContext, useEffect, useState } from "react";
// useContext to access the items array
// useEffect to manage the button styles state after render
// useState to store the state of the button style
import CartContext from "../../../store/cart-context";
import CartIcon from "../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  // onClick={props.onShowCart} from Header.js which is forwarded from App.js as onShowCart={showCartHandler}
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;
  // in all the areas that i need items, I could o cartCtx.items.length, or cartCtx.items etc
  // but now i can directly reference items from cartCtx with object destructuring
  const numberOfCartItems = items.reduce((curNumber, item) => {
    // console.log(items[1]);
    // console.log(curNumber);
    // arrays start at an index of 0.
    return curNumber + item.amount;
    // whatever is returned becomes curNumber
  }, 0);
  // reduce method works on an array, first argument is the curNumber (accumulator) that is the
  // variable that will hold the updated score that you get from each iteration and the item
  // mentioned in the video points to the current object of the ongoing iteration where current
  // object in any iteration is a cart item.

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  // add class of bump to class of button if btnIsHighlighted is true, otherwise add nothing to the already classes.button

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 800);

    return () => {
      clearTimeout(timer);
      // useEffect runs after everything else, sets setBtn to true, them after 800ms, clears the timeout
    };
  }, [items]);
  // console.log(btnIsHighlighted);

  return (
    <button className={btnClasses} onClick={props.onClickCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
      {/* dynamically outputting numberOfCartItems */}
    </button>
  );
};

export default HeaderCartButton;
