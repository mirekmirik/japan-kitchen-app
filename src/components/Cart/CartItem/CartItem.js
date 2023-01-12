import React from "react";
import styles from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <React.Fragment>
      <li className={styles["cart-item"]}>
        <div>
          <h2>{props.name}</h2>
          <div className={styles["summary"]}>
            <span className={styles["amount"]}>x {props.amount}</span>
            <span className={styles["price"]}>${props.price}</span>
          </div>
        </div>
        <div className={styles["actions"]}>
          <button onClick={props.onRemove}>-</button>
          <button onClick={props.onAdd}>+</button>
        </div>
      </li>
    </React.Fragment>
  );
};

export default CartItem;
