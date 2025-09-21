// src/components/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth(); // Use 'user' instead of 'token'
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>Sweet Shop</Link>
      <div className={styles.navLinks}>
        {user ? (
          <>
            {user.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
            <button onClick={handleLogout} className={styles.navButton}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;