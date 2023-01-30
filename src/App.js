import React, { useState } from "react";
// import Login from "./components/Auth/Login";
import Auth from "./components/Auth/Auth";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartContextProvider from "./store/CartContextProvider";

function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountData, setAccountData] = useState(null)

  const loggedInHandler = () => {
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    setIsLoggedIn(false)
  }

  const showCartHandler = () => {
    setCartIsVisible(true);
  };

  const hideCartHandler = () => {
    setCartIsVisible(false);
  };

  const checkAccountHandler = (data) => {
    console.log(data)
    setAccountData(data)
  }




  return (
    <CartContextProvider>
      <Header onLogout={logoutHandler} accountData={accountData} isLoggedIn={isLoggedIn} onShowCart={showCartHandler} />
      {!isLoggedIn && <Auth onCheckAccount={checkAccountHandler} loggedInHandler={loggedInHandler} />}
      {isLoggedIn && cartIsVisible && <Cart onHideCart={hideCartHandler} />}
      {isLoggedIn && <main>
        <Meals />
      </main>}
    </CartContextProvider>
  );
}

export default App;
