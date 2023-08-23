import { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import Laptop from '../images/laptop.png';

// Redux action types
import { ADD_TO_CART, TOGGLE_COUPON_APPLY } from '../../store/actions/types';

// API Actions
import { emptyUserCart } from '../../actions/cart';
import { createOrder } from '../../actions/order';
import { createPaymentIntent } from '../../actions/stripe';
import { RootState } from '../../store/reducers';
import { StripeCardElement, StripeCardElementChangeEvent } from '@stripe/stripe-js';

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state: RootState) => ({ ...state }));
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState<any>(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  // Payment intent response values
  const [clientSecret, setClientSecret] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    createPaymentIntent(coupon.isApplied, user!.token).then((res) => {
      console.log('create payment intent', res.data);
      setClientSecret(res.data.clientSecret);
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, [coupon.isApplied, user]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const target = e.target as typeof e.target & {name: {
      value: string
    }}

    const payload = await stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements!.getElement(CardElement) as StripeCardElement,
        billing_details: {
          name: target.name.value,
        },
      },
    });

    if (!payload || payload.error) {
      setError(`Payment failed${payload!.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      createOrder(payload, user!.token).then((res) => {
        if (res.data.ok) {
          // empty cart from local storage
          if (typeof window !== 'undefined') localStorage.removeItem('cart');

          // empty cart from redux
          dispatch({ type: ADD_TO_CART, payload: [] });

          // reset coupon to false
          dispatch({ type: TOGGLE_COUPON_APPLY, payload: false });

          // empty cart from database
          emptyUserCart(user!.token);
        }
      });
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (e: StripeCardElementChangeEvent) => {
    // listen for changes in the card element
    // and display any errors as the customer types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ''); // show error message
  };

  const cartStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <>
      {!succeeded && (
        <div>
          {coupon.isApplied && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              alt=""
              src={Laptop}
              style={{
                height: '200px',
                objectFit: 'cover',
                marginBottom: '-50px',
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total: $
              {cartTotal}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total payable : $
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : 'Pay'}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment Successful.{' '}
          <Link to="/user/history">See it in your purchase history.</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
