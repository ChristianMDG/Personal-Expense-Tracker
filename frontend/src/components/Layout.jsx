import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-row">
      <aside>
        <nav className="bg-blue-700 text-white flex h-full flex-col p-4 w-70 justify-items-stretch justify-center items-center">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/expenses">Expenses</Link>
          <Link to="/incomes">Incomes</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/profile">Profile</Link>
          {user && <button onClick={handleLogout}>Logout</button>}
        </nav>
      </aside>
      <main className="bg-amber-400 min-h-screen p-4 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
