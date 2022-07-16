import { ADDTOORDER, SHOPS, PRODUCTS, HISTORY, SNACK } from "./types";

const initStore = {
  shops: null,
  products: null,
  order: [],
  history: [],
  snack: false,
};

export const rootReducer = (state = initStore, action) => {
  switch (action.type) {
    case SHOPS: {
      return { ...state, shops: action.payload };
    }
    case PRODUCTS: {
      return { ...state, products: action.payload };
    }
    case ADDTOORDER: {
      return { ...state, order: action.payload };
    }
    case HISTORY: {
      return { ...state, history: action.payload };
    }
    case SNACK: {
      return { ...state, snack: action.payload };
    }
    default:
      return state;
  }
};
