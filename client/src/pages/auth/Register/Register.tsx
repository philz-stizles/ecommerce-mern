import { FormEvent, useEffect, useState } from 'react';
import { auth, sendSignInLink } from '../../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../../store/reducers';

const Register = ({ history }: RouteComponentProps) => {
  const [email, setEmail] = useState('theophilusighalo@gmail.com');

  const { user } = useSelector((state: RootState) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const config = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL as string,
      handleCodeInApp: true, // This must be true.
    };

    try {
      await sendSignInLink(email, config);

      // Display success toast alert
      toast.success(
        `Email is sent to ${email}. Click the link to complete your registration.`
      );

      // save user email in local storage
      localStorage.setItem('emailForRegistration', email);

      // clear state
      setEmail('');
    } catch (error: any) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode, errorMessage);
    }
  };

  const renderRegisterForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />

      <button type="submit" className="btn btn-raised">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {renderRegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
