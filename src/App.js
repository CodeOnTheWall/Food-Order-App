// Adding a Checkout/Order Form
// Submitting Orders to a BackEnd Server (http)
// Fetching Meals Data

import { useState, Fragment } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false); /* state */

  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onClickCart={showCartHandler} />
      {/* we forward back to our parent here the onClickCart, which essentially Shows Cart */}
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}
// the Cart component will only show if cartIsShown is true

export default App;
