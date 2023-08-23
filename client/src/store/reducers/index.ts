import { combineReducers } from 'redux';
import cartReducer, { CartState } from './cart-reducer';
import userReducer, { UserState } from './user-reducer';
import drawerReducer, { DrawerState } from './drawer-reducer';
import couponReducer, { CouponState } from './coupon-reducer';
import searchReducer, { SearchState } from './search-reducer';

export type RootState = {
  cart: CartState;
  user: UserState;
  drawer: DrawerState;
  coupon: CouponState;
  search: SearchState;
};

export default combineReducers({
  cart: cartReducer,
  user: userReducer,
  drawer: drawerReducer,
  coupon: couponReducer,
  search: searchReducer,
});
