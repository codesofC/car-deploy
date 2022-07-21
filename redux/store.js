import { createStore } from "redux";
import CartReducer from "./reducer/CartReducer";

const store = createStore(CartReducer);

export default store