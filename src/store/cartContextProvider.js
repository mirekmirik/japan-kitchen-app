import React, {useReducer} from 'react'
import CartContext from "./cart-context"


const defaultCartState = {
    items: [],
    totalAmount: 0
}

const reducerFunc = (prevState, action) => {
  // Если тип действия 'ADD_ITEM'
  if (action.type === "ADD_ITEM") {
    // Расчитываем новую общую сумму, добавляя цену добавляемого товара умноженную на его количество
    const updatedTotalAmount =
      prevState.totalAmount + action.item.price * action.item.amount;

    // Находим индекс товара в корзине с таким же ID, как у добавляемого товара, если он существует в текущем состоянии
    const existingCartItemIndex = prevState.items.findIndex((item) => {
      return item.id === action.item.id;
    });

    // Получаем товар в корзине с таким же ID, как у добавляемого товара, если он существует в текущем состоянии
    const existingCartItem = prevState.items[existingCartItemIndex];

    let updatedItem;
    let updatedItems;

    // Если товар уже существует в корзине, обновляем его количество и массив товаров
    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...prevState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    // Если товара нет в корзине, добавляем его в массив товаров
    else {
      updatedItem = {
        ...action.item,
      };
      updatedItems = prevState.items.concat(updatedItem);
    }

    // Возвращаем обновленное состояние с новым массивом товаров и новой общей суммой

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
};

const CartContextProvider = (props) => {

    const [state, dispatchState] = useReducer(reducerFunc, defaultCartState)

    const addItemHandler = (item) => {
        dispatchState({
            type: 'ADD_ITEM',
            item: item
        })
    };
    const removeItemHandler = (id) => {
        dispatchState({
            type: 'REMOVE_ITEM',
            id: id
        })
    };

    const cartContext = {
        items: state.items,
        totalAmount: state.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    }
    console.log('state', state)
    console.log('cartContext', cartContext)


    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
};


export default CartContextProvider;