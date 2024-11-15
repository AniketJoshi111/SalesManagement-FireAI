import  { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SalesForm from './components/SalesForm';
import SalesList from './components/SalesList';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (!token) {
    return (
      <div>
        <h1>Login</h1>
        <LoginForm setToken={setToken} />
        <h1>Register</h1>
        <RegisterForm />
      </div>
    );
  }

  return (
    <div>
      <h1>Sales Management</h1>
      <SalesForm refreshSales={() => {}} />
      <SalesList />
      <button
        onClick={() => {
          localStorage.removeItem('token');
          setToken(null);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default App;
