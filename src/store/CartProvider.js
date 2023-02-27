import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const ACTIONS = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  CLEAR: "CLEAR",
};

const cartReducer = (state, action) => {
  // state be nothing even on first click, since its always prevState
  if (action.type === ACTIONS.ADD) {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // this function executes for every item in the array
    // if the item we are looking at in the array has the same id as the passed in action
    // then return the index of that item if it exists

    const existingCartItem = state.items[existingCartItemIndex];
    // inserting the index back into state.items and saving to const
    let updatedItems;

    if (existingCartItem) {
      // if this is truthy, aka which will only be the case if its apart of the array
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      // now updatedItems is = to a new array where I copy items, so that I update this immutably (without changing the state)
      updatedItems[existingCartItemIndex] = updatedItem;
      // now we pick the old item (inserting the index) which we identified in the cart items array, and update it to be updatedItem
    } else {
      updatedItems = state.items.concat(action.item);
      // otherwise add the whole item to state.items, concat merges both array and returns a new array
      // without changing the old arrays, and now a new id is added
    }
    // console.log(updatedItems);
    return {
      items: updatedItems,
      // this is essentially updatedItem
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === ACTIONS.REMOVE) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
      // this is if theres only 1 item, so we remove that item and id entirely
      // so we return the items that dont have the id of the passed in action.id
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      // this is if we have more than 1 item of the same id
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === ACTIONS.CLEAR) {
    return defaultCartState;
  }

  return defaultCartState;
};

// we want to update our state in an inmutable way, so that we dont mess up the previous state with useReducer

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (itemArg) => {
    dispatchCartAction({ type: ACTIONS.ADD, item: itemArg });
    //  type and item are what will be dispatched as actions to CartReducer
    // itemArg is id, name, amount price
  };
  // this is the dispatched action

  const removeItemFromCartHandler = (id) => {
    // takes in id as a param
    dispatchCartAction({ type: ACTIONS.REMOVE, id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: ACTIONS.CLEAR });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    //  cartCtx.addItem({
    // id: props.id,
    // name: props.name,
    // amount: amount,
    // price: props.price,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// Mutable can be changed or added - Reference type, Immutable cant be changed or added - Primitive type
// Data assigned to JS variables can be 2 types, primitize type and reference type
// PRIMITIVE TYPES: undefined, null, boolean, number, string, symbol
// REFERENCE TYPES: Objects that are made up of multiple values assigned to them,
// they are stored as reference in memory and not as independent variables assigned to variables
// Objects, Arrays, Functions

// to avoid the above and changing objects/arrays etc, we can use ...spreadoperator
// this allows us to make a copy of the reference type and save that to a new variable
