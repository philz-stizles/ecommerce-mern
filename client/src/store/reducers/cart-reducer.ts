import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/types';
import { Product } from './../../types';

type Shipping = 'yes' | 'no';

export type CartProduct = Product & {
  count: number;
  product: { title: string; price: number; brand: string; shipping: Shipping };
};

export type CartState = CartProduct[];

type CartAction = { type: string, payload: any };

let INITIAL_STATE: CartState = [];

if (typeof window !== 'undefined') {
  const cart = localStorage.getItem('cart');
  if (cart) {
    INITIAL_STATE = JSON.parse(cart);
  } else {
    INITIAL_STATE = [];
  }
}

const cartReducer = (state: CartState = INITIAL_STATE, action: CartAction) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_CART:
      return payload;
    case REMOVE_FROM_CART:
      return payload;
    default:
      return state;
  }
};

export default cartReducer;
