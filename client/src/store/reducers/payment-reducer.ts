import { SET_PAYMENT_METHOD } from '../actions/types';

export type PaymentState = {
  cashOnDelivery: boolean;
};

type PaymentAction = { type: string; payload: any };

const INITIAL_STATE = {
  cashOnDelivery: false,
};

const paymentReducer = (
  state: PaymentState = INITIAL_STATE,
  action: PaymentAction
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PAYMENT_METHOD:
      return { ...state, ...payload };
    default:
      return state;
  }
};
export default paymentReducer;