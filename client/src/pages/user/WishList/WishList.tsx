import React, { useState, useEffect, useCallback } from 'react';
import UserNav from '../../../components/navs/UserNav';
import { getUserWishlist, removeFromUserWishlist } from '../../../actions/user';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { RootState } from '../../../store/reducers';
import { Product } from '../../../types';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { user } = useSelector((state: RootState) => ({ ...state }));

  const loadWishlist = useCallback(
    () =>
      getUserWishlist(user!.token).then((res) => {
        console.log(res);
        setWishlist(res.data.wishlist);
      }),
    [user]
  );
  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const handleRemove = (productId: string) =>
    removeFromUserWishlist(productId, user!.token).then((res) => {
      loadWishlist();
    });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h4>Wishlist</h4>

          {wishlist.map((p) => (
            <div key={p._id} className="alert alert-secondary">
              <Link to={`/product/${p.slug}`}>{p.title}</Link>
              <span
                onClick={() => handleRemove(p._id)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
