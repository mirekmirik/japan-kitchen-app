import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import SubmitOrder from "./SubmitOrder";
import Spinner from "../../Spinner/Spinner";



const Cart = (props) => {

  const [isSubmitOrderAvailable, setIsSubmitOrderAvailable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [httpErrorMessage, setIsHttpErrorMessage] = useState(null)
  const [httpSuccessMessage, setisHttpSucessMessage] = useState(null)

  const cartContext = useContext(CartContext);

  console.log(cartContext.items)

  const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const removeCartItemHandler = (id) => {
    cartContext.removeItem(id);
  };

  const addCartItemHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderHandler = (event) => {
    setIsSubmitOrderAvailable(true)
  }

  const submitOrderHandler = async (userData) => {
    setIsLoading(true)
    try {
      const response = await fetch('https://jokes-app-d2918-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedMeals: cartContext.items
        })
      })
      if (!response.ok) {
        throw new Error('Что-то пошло не так..')
      }
      setisHttpSucessMessage("Заказ успешно оформлен! Ожидайте прибытия.")
      cartContext.clearCart()
    } catch (err) {
      setIsHttpErrorMessage(err.message)
      setIsLoading(false)
    }
    setIsLoading(false)
  }

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addCartItemHandler.bind(null, item)}
          onRemove={removeCartItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalButtons = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHideCart}>
        Закрыть
      </button>
      {hasItems && <button className={styles.button} onClick={orderHandler}>Заказать</button>}
    </div>
  )

  const cartItemsAndTotalAmount =(<React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Итого</span>
        <span>{totalAmount}</span>
      </div>
    </React.Fragment>)


  let content;
  if (httpErrorMessage) {
    content = (
      <React.Fragment>
        <p>{httpErrorMessage}</p>
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.onHideCart}>
            Закрыть
          </button>
        </div>
      </React.Fragment>
    )
  } else if (httpSuccessMessage) {
    content = (
      <React.Fragment>
        <p>{httpSuccessMessage}</p>
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.onHideCart}>
            Закрыть
          </button>
        </div>
      </React.Fragment>
    )
  } else if (isLoading) {
    content = <Spinner />
  } else if (isSubmitOrderAvailable) {
    content = (
      <React.Fragment>
        {cartItemsAndTotalAmount}
        <SubmitOrder onHideCart={props.onHideCart} onSubmit={submitOrderHandler} />
      </React.Fragment>
    )
  } else {
    content = (
      <React.Fragment>
        {cartItemsAndTotalAmount}
        {modalButtons}
      </React.Fragment>
    )
  }

  return (
    <Modal onHideCart={props.onHideCart}>
      {content}
    </Modal>
  );
};

export default Cart;
