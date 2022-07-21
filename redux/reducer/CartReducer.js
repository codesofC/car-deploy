const INITIAL_STATE = {
  cart: [],
};

export default function CartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADDITEM": {
      const indexItem = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexItem !== -1) {
        const updateQuantity = {
          ...state.cart[indexItem],
          quantity: state.cart[indexItem].quantity + action.payload.quantity,
        };
        const newArray = [...state.cart];
        newArray.splice(indexItem, 1, updateQuantity);

        return {
          cart: newArray,
        };
      } else {
        const newArray = [...state.cart];
        newArray.push(action.payload);

        return {
          cart: newArray,
        };
      }
    }
    case "UPDATEITEM": {
      const indexItemUpdate = state.cart.findIndex(
        (item) =>   item.id === action.payload.id
      );
      const newArray = [...state.cart];
      newArray.splice(indexItemUpdate, 1, action.payload);

      return {
        cart: newArray,
      };
    }
    case "DELETEITEM": {
      const newArray = [...state.cart].filter(
        (item) => item.id !== action.payload.id
      );

      return {
        cart: newArray,
      };
    }
    case "DELETE": {
      return {
        cart: []
      }
    }
  }

  return state;
}
