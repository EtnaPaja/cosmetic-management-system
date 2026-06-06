import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import logo from '../assets/logo.png';

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav>
    <div className="logo-container">
  <img src={logo} alt="E&E Cosmetics" className="logo" />
  <h2>E&E Cosmetics</h2>
</div>

      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/products">Products</Link>
        </li>
<li>
  <Link to="/orders">Orders</Link>
</li>

<li>
  <Link to="/add-order">Add Order</Link>
</li>
        <li>
          <Link to="/add-product">Add Product</Link>
        </li>

        {user ? (
          <>
            <li>{user.name}</li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;