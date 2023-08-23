import { FormEvent, useState } from 'react';
import UserNav from '../../../components/navs/UserNav';
import { auth, updateUserPassword } from '../../../firebase';
import { toast } from 'react-toastify';

const Password = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // console.log(password);

    const user = auth.currentUser;
    user && updateUserPassword(user, password)
      .then(() => {
        setLoading(false);
        setPassword('');
        toast.success('Password updated');
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const renderPasswordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter new password"
          disabled={loading}
          value={password}
        />
        <button
          className="btn btn-primary"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Password Update</h4>
          )}
          {renderPasswordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
