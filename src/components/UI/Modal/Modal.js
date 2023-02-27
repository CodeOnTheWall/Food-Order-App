import { Fragment } from "react";
import ReactDOM from "react-dom";
// we need this for createPortal

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  // onClose={hideCartHandler} from Cart.js from App.js
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
      {/* we need props.children since there will be children to wrap */}
    </div>
  );
};
// the props above given to Backdrop and ModalOverlay components are being passed here from the Modal below

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        // forwarding to Backdrop component our onClose={hideCartHandler} from Cart.js from App.js
        portalElement
        // portalling the element to "overlays"
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
        // create portal needs a second argument, portalElement, for where to portal the element
      )}
    </Fragment>
  );
};

export default Modal;
