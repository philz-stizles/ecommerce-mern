import React, { useState, useEffect, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import {
  getCoupons,
  removeCoupon,
  createCoupon,
} from '../../../actions/coupon';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons';
import { RootState } from '../../../store/reducers';
import AdminNav from '../../../components/navs/AdminNav';

const CouponCreate = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState<string | undefined>('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  // redux
  const { user } = useSelector((state: RootState) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => getCoupons().then((res) => setCoupons(res.data));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({ name, expiry, discount }, user!.token)
      .then((res) => {
        setLoading(false);
        loadAllCoupons(); // load all coupons
        setName('');
        setDiscount('');
        setExpiry('');
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => console.log('create coupon err', err));
  };

  const handleRemove = (couponId: string) => {
    if (window.confirm('Delete?')) {
      setLoading(true);
      removeCoupon(couponId, user!.token)
        .then((res) => {
          loadAllCoupons(); // load all coupons
          setLoading(false);
          toast.error(`Coupon "${res.data.name}" deleted`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Coupon</h4>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <br />
              <DatePicker
                className="form-control"
                selected={new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date?.toISOString())}
                required
              />
            </div>

            <button className="btn btn-outline-primary">Save</button>
          </form>

          <br />

          <h4>{coupons.length} Coupons</h4>

          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map(({ _id, name, discount, expiry }) => (
                <tr key={_id}>
                  <td>{name}</td>
                  <td>{new Date(expiry).toLocaleDateString()}</td>
                  <td>{discount}%</td>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(_id)}
                      className="text-danger pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CouponCreate;
