import { useContext, useState, Fragment } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import classes from "./Cart.module.css";
import useHttp from "../../hooks/use-http";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const { isLoading, error, sendRequest: sendOrderRequest } = useHttp();
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  // toFixed method is number of 00 after the .dot. i.e 124.567 is 124.58
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  // only need to match the id for our remove handler

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  // because the item passed in may have an amount of 4, we would be incorrectly adding,
  // hence we set each add to an amount of 1
  // the button click that occurs to send the (item) here knows its the item as we mapped through them below
  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData) => {
    sendOrderRequest({
      url: "https://react-http-5971a-default-rtdb.firebaseio.com/orders.json",
      method: "POST",
      body: { user: userData, orderItems: cartCtx.items },
    });
    setDidSubmit(true);
    cartCtx.clearCart();
  };
  // we are calling this /orders to create that node in the dataBase, and it has to be followed by .json

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        // map() method creates a new array populated with the results of calling a provided
        // function on every element in the calling array.
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          // bind ensures that id will be passed to the cartItemRemoveHandler
          onAdd={cartItemAddHandler.bind(null, item)}
          // bind pre configures a function for future execution, and pre configure the argument to be passed through
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending Order Data</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {/* onClose={hideCartHandler} from App.js */}
      {!isLoading && !didSubmit && cartModalContent}
      {isLoading && isSubmittingModalContent}
      {!isLoading && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
