import classes from "./CartItem.module.css";

const CartItem = (props) => {
  // key={item.id}
  //         name={item.name}
  //         amount={item.amount}
  //         price={item.price}
  //         onRemove={cartItemRemoveHandler.bind(null, item.id)}
  //         onAdd={cartItemAddHandler.bind(null, item)}
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
        {/* onRemove and onAdd get forwarded to Cart.js */}
      </div>
    </li>
  );
};

export default CartItem;
