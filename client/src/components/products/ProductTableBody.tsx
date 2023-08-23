import ModalImage from 'react-modal-image';
import laptop from '../../images/laptop.png';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { ADD_TO_CART } from '../../store/actions/types';
import { CartProduct } from '../../store/reducers/cart-reducer';
import { ChangeEvent } from 'react';

const ProductTableBody = ({ p }: { p: CartProduct }) => {
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  let dispatch = useDispatch();

  const handleColorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let cart: CartProduct[] = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart') as string);
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          product.color = e.target.value;
          return product;
        } else {
          return product;
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));

      dispatch({ type: ADD_TO_CART, payload: cart });
    } else {
      return;
    }
  };

  const handleCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    let count = Number(e.target.value) < 1 ? 1 : +e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart: CartProduct[] = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart') as string);
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          product.count = count;
          return product;
        } else {
          return product;
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));

      dispatch({ type: ADD_TO_CART, payload: cart });
    }
  };

  const handleRemove = (product: CartProduct) => {
    let cart: CartProduct[] = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart') as string);
      }

      // Filter out target product
      const filteredCart = cart.filter((item) => item._id !== product._id);

      // Save to local storage
      localStorage.setItem('cart', JSON.stringify(filteredCart));

      // Save to redux
      dispatch({ type: ADD_TO_CART, payload: filteredCart });
    } else {
      return;
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: '100px', height: 'auto' }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td>${p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            onChange={handleColorChange}
            name="color"
            className="form-control"
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((c) => c !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleCountChange}
          />
        </td>
        <td className="text-center">
          {p.shipping === 'Yes' ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined
            onClick={() => handleRemove(p)}
            className="text-danger pointer"
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductTableBody;
