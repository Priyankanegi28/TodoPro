import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Logout = () => {
  const { logout } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        navigate('/');
      } catch (err) {
        console.error(err);
        navigate('/todos');
      }
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <main className="logout-container">
      <div className="logout-card">
        <div className="logout-icon">
          <FontAwesomeIcon icon={faSignOutAlt} />
        </div>
        <h1>Logging out...</h1>
        <p>You're being securely logged out of your TodoPro account.</p>
      </div>
    </main>
  );
};

export default Logout;