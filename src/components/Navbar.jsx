import { faBars, faHome, faSignInAlt, faTasks, faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = UserAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky-header">
      <nav className="navbar">
        <div className="nav-brand">
          <FontAwesomeIcon icon={faTasks} />
          <span>TodoPro</span>
        </div>
        
        <button className="hamburger" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>
        
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="active" onClick={closeMenu}>
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
          {!user ? (
            <>
              <Link to="/signup" onClick={closeMenu}>
                <FontAwesomeIcon icon={faUserPlus} /> Signup
              </Link>
              <Link to="/login" onClick={closeMenu}>
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Link>
            </>
          ) : (
            <Link to="/todos" onClick={closeMenu}>
              My Todos
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;