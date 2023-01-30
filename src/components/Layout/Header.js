import React from "react";
import sushiImage from "../../assets/sushi.jpg";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {

  console.log(props.accountData)
  return (
    <React.Fragment>

      <header className={styles.header}>
        <h1>Япона Кухня</h1>
        {props.isLoggedIn &&
          <div className={styles.controls}>
            <HeaderCartButton onClick={props.onShowCart} />
            {!props.accountData ? <p className={styles.loggin} onClick={props.onLogout}>Войти в систему</p> : <p onClick={props.onLogout}>Выйти из системы</p>}
          </div>}
      </header>

      {props.isLoggedIn && <div className={styles["main-image"]}>
        <img src={sushiImage} alt="Блюда японской кухни" />
      </div>}

    </React.Fragment>
  );
};

export default Header;
