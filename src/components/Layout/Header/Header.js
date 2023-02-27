import { Fragment } from "react";

import HeaderCartButton from "../HeaderCartButton/HeaderCartButton";
import mealsImage from "../../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  // onShowCart={showCartHandler} props from App.js
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClickCart={props.onClickCart} />
        {/* forwarding from App.js onShowCart={showCartHandler} */}
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
