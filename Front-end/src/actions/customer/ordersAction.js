import {
    ERROR_CLEANER,
    SUCCESS_CLEANER,
    ERROR,
    GET_PRODUCT,
    CHANGE_CART,
    
  } from "../../actionTypes/public/publicActionTypes";
  import {
    GET_ORDER,
  } from "../../actionTypes/customer/customerActionTypes";
  import { errorHandler } from "../error/errorHandler";
  
  import api from "../../config/api";
  
  export const error_cleaner = () => {
    return {
      type: ERROR_CLEANER,
    };
  };
  export const success_cleaner = () => {
    return {
      type: SUCCESS_CLEANER,
    };
  };


      export const get_orders = (retData, incomingData) => async (ReduxDispacth) => {
    try {
      const params = new URLSearchParams();
      params.append('userEmail', incomingData);

      const response = await api.post("/customer/pv/orders", params);

      if (response && response.data) {
        retData(response.data);
      }
    } catch (err) {
      errorHandler(err, ReduxDispacth, ERROR);
    }
  };