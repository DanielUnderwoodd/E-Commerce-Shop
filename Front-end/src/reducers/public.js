import {
  GET_PRODUCT,
  CHANGE_CART,
} from "../actionTypes/public/publicActionTypes";
import { LOG_OUT_CUSTOMER } from "../actionTypes/customer/customerActionTypes";

let initial = {
  Products: [],
  cart: [],
};

export default (state = initial, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return { ...state, Products: action.payload };
    case CHANGE_CART:
      return { ...state, cart: action.payload };
    case LOG_OUT_CUSTOMER:
      return initial;
    default:
      return state;
  }
};
