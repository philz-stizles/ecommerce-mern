import { useEffect, useState } from 'react';

import { getAllOrders, changeOrderStatus } from '../../actions/order';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../../store/reducers';
import AdminNav from '../../components/navs/AdminNav';
import Orders from '../../components/orders/Orders';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state: RootState) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getAllOrders(user!.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId: string, orderStatus: string) => {
    changeOrderStatus(orderId, orderStatus, user!.token).then((res) => {
      toast.success('Status updated');
      loadOrders();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Admin Dashboard</h4>
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
