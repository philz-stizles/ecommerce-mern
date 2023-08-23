import { Order } from '../../types';

type Props = {
  order: Order;
  showStatus?: boolean;
};

const ShowPaymentInfo = ({ order, showStatus }: Props) => (
  <div>
    <p>
      <span>Order Id: {order.paymentIntent.id}</span>
      {' / '}
      <span>
        Amount:{' / '}
        {(order.paymentIntent.amount /= 100).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </span>
      {' / '}
      <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
      {' / '}
      <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      {' / '}
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
      {' / '}
      <span>
        Orderd on:{' / '}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {' / '}
      <span className="badge bg-primary text-white">
        STATUS: {order.status}
      </span>
    </p>
  </div>
);

export default ShowPaymentInfo;
