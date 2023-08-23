import { TOGGLE_COUPON_APPLY } from '../actions/types';

export type CouponState = {
  isApplied: boolean;
};

type CouponAction = { type: string, payload: boolean };

const INITIAL_STATE = { isApplied: false };

const couponReducer = (
  state: CouponState = INITIAL_STATE,
  action: CouponAction
) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_COUPON_APPLY:
      return { ...state, isApplied: payload };
    default:
      return state;
  }
};

export default couponReducer
